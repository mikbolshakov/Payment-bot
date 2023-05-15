import { ConfigService } from "../config/config.service";
import { CreatePaymentResult, ICryptomusService } from "./cryptomus.interface";
import crypto from "crypto";
import axios from "axios";

export class CryptomusService implements ICryptomusService {
  private apiKey: string;
  private merchantId: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get("CRYPTO_API_KEY");
    this.merchantId = this.configService.get("CRYPTO_MERCHANT_ID");
  }

  // signature encryption
  getHeader(payload: string) {
    const sign = crypto
      .createHash("md5")
      .update(Buffer.from(payload).toString("base64") + this.apiKey)
      .digest("hex");
    return {
      merchant: this.merchantId,
      sign,
    };
  }

  // create payment
  async createPayment(amount: number, orderId: string) {
    try {
      const payload = {
        amount: amount.toString(),
        currency: "USD",
        order_id: orderId,
      };
      const { data } = await axios.post<CreatePaymentResult>(
        "https://api.cryptomus.com/v1/payment",
        payload,
        {
          headers: this.getHeader(JSON.stringify(payload)),
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  // check payment
  async checkPayment(uuid: string): Promise<CreatePaymentResult | undefined> {
    try {
      const payload = {
        uuid,
      };
      const { data } = await axios.post<CreatePaymentResult>(
        "https://api.cryptomus.com/v1/payment/info",
        payload,
        {
          headers: this.getHeader(JSON.stringify(payload)),
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
