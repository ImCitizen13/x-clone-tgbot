import { Markup, Telegraf } from "telegraf";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import type { Question, TriviaCategory } from "./types";

export function createQuestionsForCategory(
  category: TriviaCategory,
  ctx: any,
  bot: Telegraf,
  questionIndex: number,
  score: number
) {
  const MAX = 3;

  const questions: Question[] = category.questions;

  const currentScore = score;
  const nextIndex =
    questions.length - 1 > questionIndex ? questionIndex + 1 : null;
  ctx.telegram.sendMessage(
    ctx.from.id,
    `${questions[questionIndex].question}`,
    Markup.inlineKeyboard(
      getInlineChoicesForQuestion(
        questions[questionIndex],
        bot,
        category,
        currentScore,
        nextIndex
      )
    )
  );
}

function getInlineChoicesForQuestion(
  { question, wrong_choices, correct_answer }: Question,
  bot,
  category: TriviaCategory,
  score,
  nextIndex?: number
) {
  wrong_choices.forEach((wrongAnswer) => {
    bot.action(`${wrongAnswer}`, (ctx) => {
      ctx.deleteMessage();
      bot.telegram.sendAnimation(
        ctx.chat.id,
        "https://media.tenor.com/z8IxIGwkSo0AAAAd/false-wrong.gif"
      );
      ctx.reply(`The correct answer was "${correct_answer}"`);
      answerHandler(category, ctx, bot, nextIndex, score);
    });
  });
  bot.action(`${correct_answer}`, (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Correct ✅");
    const adjustedScore = score + 1;
    answerHandler(category, ctx, bot, nextIndex, adjustedScore);
  });

  let inlineChoices: InlineKeyboardButton[][] = wrong_choices.map((choice) => {
    return [Markup.button.callback(choice, choice)];
  });
  inlineChoices.push([Markup.button.callback(correct_answer, correct_answer)]);
  return inlineChoices;
}

function answerHandler(category: TriviaCategory, ctx, bot, nextIndex, score) {
  if (nextIndex !== null) {
    setTimeout(() => {
      createQuestionsForCategory(category, ctx, bot, nextIndex, score);
    }, 2000);
  }

  const congrats = [
    "https://media.tenor.com/rhghD8RPVhUAAAAd/congratulations-tribe.gif",
    "https://media.tenor.com/0SBf81pEoogAAAAC/congrats-congratulations.gif",
    "https://media.tenor.com/ajMFQ7IfFf4AAAAC/mua-kiss.gif",
  ];
  const loser = [
    "https://media.tenor.com/17Uni1ZNWS4AAAAC/you-big-dummy-sanford-and-son.gif",
    "https://media.tenor.com/TIohhhv3TDoAAAAC/hey-loser-mr-bean.gif",
    "https://media.tenor.com/WHcto6agDpUAAAAC/face-palm-scherezade-shroff.gif",
  ];
  if (nextIndex == null) {
    const finalPercentage = score / category.questions.length;

    if (finalPercentage < 0.5) {
      setTimeout(() => {
        bot.telegram.sendAnimation(
          ctx.chat.id,
          loser[Math.floor(Math.random() * loser.length)]
        );
      }, 2000);
    } else {
      setTimeout(() => {
        bot.telegram.sendAnimation(
          ctx.chat.id,
          congrats[Math.floor(Math.random() * congrats.length)]
        );
      }, 1000);
    }
    setTimeout(() => {
      ctx.reply(`Your score is ${score}/${category.questions.length}`);
    }, 3000);
    setTimeout(() => {
      ctx.reply("Choose /trivia again to choose another category");
    }, 4000);
  }
}
