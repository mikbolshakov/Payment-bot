import { config, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.interface";

// сервис конфигурации: прочитали env файл, вернули нужное значение из ключа
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput; // то что парсим из dotenv (ключ/значение)

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error("Не найден файл .env");
    }
    if (!parsed) {
      throw new Error("Пустой файл .env");
    }
    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error("Нет такого ключа");
    }
    return res;
  }
}
