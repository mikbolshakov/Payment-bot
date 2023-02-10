import { Context } from "telegraf";
// контекст сессии
export interface SessionData {
  isLike: boolean;
}

export interface IBotContext extends Context {
  session: SessionData;
}
