import { Note, Key, Scale, Chord } from "@tonaljs/tonal";
import * as Tone from "tone";
import { Interval, INTERVALS } from "../types/Interval";

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const ACCIDENTALS = ["#", "b", ""];

export const synth = new Tone.Synth().toDestination();

/**
 * Returns a random note in scientific notation within a given range as a string.
 * @param startOctave lowest octave
 * @param endOctave highest octave
 * @returns A random note in scientific notation within a given range as a string
 */
export function getRandomNote(
    startOctave: number = 3,
    endOctave: number = 4
): string {
    const OCTAVE =
        Math.floor(Math.random() * (endOctave - startOctave + 1)) + startOctave;

    const LETTER_INDEX = Math.floor(Math.random() * LETTERS.length);
    const ACCIDENTAL_INDEX = Math.floor(Math.random() * ACCIDENTALS.length);

    const NOTE = LETTERS[LETTER_INDEX] + ACCIDENTALS[ACCIDENTAL_INDEX];

    return NOTE + OCTAVE.toString();
}

export function getRandomIntervalName(): string {
    const INTERVAL_INDEX = Math.floor(Math.random() * INTERVALS.length);

    return INTERVALS[INTERVAL_INDEX];
}

export function getRandomInterval(intervalName: string = ""): Interval {
    if (intervalName === "") {
        intervalName = getRandomIntervalName();
    }

    const FIRST_NOTE = getRandomNote();
    const SECOND_NOTE = Note.transpose(FIRST_NOTE, intervalName);

    const interval: Interval = {
        name: intervalName,
        firstNote: FIRST_NOTE,
        secondNote: SECOND_NOTE,
    };

    return interval;
}
