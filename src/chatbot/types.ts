export type TriviaCategory = {
  category: string;
  questions: Question[];
};

export type InlineChoice = {
  text: string;
  action: string;
  callback: () => {};
};

export type Question = {
  question: string;
  wrong_choices: string[];
  correct_answer: string;
};

export type keyboardCategory = {
  text: string
}

// module.exports = { Choice, Question}
