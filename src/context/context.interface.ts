import { Context } from 'telegraf';

// session context
export interface SessionData {
  isLike: boolean;
}

export interface IBotContext extends Context {
  session: SessionData;
}
