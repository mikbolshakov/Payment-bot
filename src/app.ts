import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/command.start";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { CronService } from "./cron/cron.service";
import { ICryptomusService } from "./crypto/cryptomus.interface";
import { CryptomusService } from "./crypto/cryptomus.service";
import { IDataBase } from "./database/database.interface";
import { DatabaseService } from "./database/database.service";

// t.me/Payment_gh16_bot
class Bot {
  bot: Telegraf<IBotContext>;
  commands: Command[] = [];

  constructor(
    private readonly configService: IConfigService,
    private readonly databaseService: IDataBase,
    private readonly cryptomusService: ICryptomusService
  ) {
    // read the config
    this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN")); // added a bot with a work context
    this.bot.use(new LocalSession({ database: "sessions.json" }).middleware()); // added sessions
  }

  // commands and their processing
  async init() {
    await new CronService(
      this.databaseService,
      this.cryptomusService,
      this.bot
    ).init();
    await this.databaseService.init(); // connect to database
    this.commands = [
      new StartCommand(this.bot, this.cryptomusService, this.databaseService),
    ];
    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }
}

const config = new ConfigService();
const cryptomusService = new CryptomusService(config);
const database = new DatabaseService();
const bot = new Bot(config, database, cryptomusService);
bot.init();
