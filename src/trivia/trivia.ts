import _jsonQuestions from "./trivia_questions.json";
import { TriviaCategory } from "../chatbot/types";

export function readTriviaJson(): TriviaCategory[] {
    const triviaCategories = _jsonQuestions as TriviaCategory[]
    return triviaCategories
}
