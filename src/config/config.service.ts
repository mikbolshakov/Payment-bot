import { config, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.interface";

// configuration service: read the env file, return the desired value from the key
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput; // what we parse from dotenv (key/value)

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error(".env file not found");
    }
    if (!parsed) {
      throw new Error("Empty .env file");
    }
    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error("No such key");
    }
    return res;
  }
}
