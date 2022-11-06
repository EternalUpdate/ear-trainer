import { Note, Key, Scale, Chord } from "@tonaljs/tonal";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answer: string[];
    question: string;
    type: string;
};
