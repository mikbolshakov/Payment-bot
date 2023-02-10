// интерфес для конфига dotenv файла
export interface IConfigService {
  get(key: string): string;
}
