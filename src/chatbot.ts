import { Markup, Telegraf } from "telegraf";
import { createQuestionsForCategory } from "./chatbot/questionGenerator";
import { keyboardCategory, Question, TriviaCategory } from "./chatbot/types";

// Commands
export function setTriviaCommand(
  bot: Telegraf,
  triviaCategories: TriviaCategory[]
) {
  bot.telegram.setMyCommands([
    {
      command: "trivia",
      description: "Please choose a category",
    },
  ]);
  const categories: keyboardCategory[][] = triviaCategories.map((category) => {
    bot.hears(category.category, (ctx) => {
      handleCategoryChoice(ctx, category);
      setTimeout(() => {
        const MAX = 3;
        const shuffledQuesions = Array.from(category.questions).sort(
          () => 0.5 - Math.random()
        );
        const categoryRandomQuestions: Question[] = shuffledQuesions.slice(
          0,
          MAX
        );
        const newCategory: TriviaCategory = {
          category: category.category,
          questions: categoryRandomQuestions,
        };

        createQuestionsForCategory(newCategory, ctx, bot, 0, 0);
      }, 3000);
    });
    return [{ text: category.category }];
  });
  // Trivia Command listener
  bot.command("trivia", (ctx) => {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Welcome to the trivia bot, please choose a trivia category to start",
      {
        reply_markup: {
          keyboard: categories,
          one_time_keyboard: true,
          resize_keyboard: false,
        },
      }
    );
    bot.telegram.sendAnimation(
      ctx.chat.id,
      "https://media.tenor.com/a_95izPQSvsAAAAC/yolo-peace.gif"
    );
  });
}

function handleCategoryChoice(ctx, category: TriviaCategory) {
  ctx.reply(`Ok lets start with the ${category.category} questions, ready!`);

  setTimeout(() => {
    ctx.reply("Let's go!");
  }, 2000);
}
// Questions
