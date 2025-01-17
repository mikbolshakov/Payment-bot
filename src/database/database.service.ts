import { PrismaClient } from '@prisma/client';
import { IDataBase } from './database.interface';

// connection to a pre-configured prisma database
export class DatabaseService extends PrismaClient implements IDataBase {
  async init(): Promise<void> {
    await this.$connect();
  }
}
