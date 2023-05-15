import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

// abstract class for integrating any commands
export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
