import { Telegraf, Markup } from "telegraf";
import * as dotenv from "dotenv";
import { setTriviaCommand } from "./chatbot";
import { readTriviaJson } from "./trivia/trivia";
import { TriviaCategory } from "./chatbot/types";

dotenv.config();

const token = process.env.BOT_TOKEN;
const bot = token ? new Telegraf(token) : new Telegraf("");
bot.start((ctx) =>
  ctx.reply(
    "Welcome to the trivia bot, please click on /trivia or choose it from the menu to start "
  )
);
bot.help((ctx) => {
  ctx.reply("Please choose the command /trivia to start the trivia");
});

// bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));

const triviaCategories: TriviaCategory[] = readTriviaJson();

setTriviaCommand(bot, triviaCategories);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
