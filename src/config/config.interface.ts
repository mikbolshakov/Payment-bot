// interface for dotenv file config
export interface IConfigService {
  get(key: string): string;
}
