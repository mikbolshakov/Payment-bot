import { PrismaClient } from '@prisma/client';

export interface IDataBase extends PrismaClient {
  init(): Promise<void>;
}
