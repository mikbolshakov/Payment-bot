import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";

// абстрактный класс для интеграции любых команд
export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
