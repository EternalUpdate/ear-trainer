import { Note, Key, Scale, Chord } from "@tonaljs/tonal";
import React, { useState, useEffect, useCallback } from "react";
import * as Tone from "tone";

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const synth = new Tone.Synth().toDestination();

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

    const LETTER_INDEX = Math.floor(Math.random() * 7);
    const NOTE = LETTERS[LETTER_INDEX];

    return NOTE + OCTAVE.toString();
}

export const RandomNoteGenerator: React.FC = () => {
    const [note, setNote] = useState<string>("new note");

    // when note changes
    useEffect(() => {
        if (note !== "new note") {
            synth.triggerAttackRelease(note, "8n");
        }
    }, [note]);

    return (
        <div>
            <h2>Random Note Generator</h2>
            <p>{note}</p>
            <button
                onClick={() => {
                    setNote(getRandomNote());
                }}
            >
                Generate new note
            </button>
            <NotePlayerButton note={note} buttonText={"Play note"} />
        </div>
    );
};

type NotePlayerProps = {
    note: string;
    buttonText: string;
};

export const NotePlayerButton: React.FC<NotePlayerProps> = ({
    note,
    buttonText,
}) => {
    return (
        <button
            onClick={() => {
                if (note !== "new note") {
                    synth.triggerAttackRelease(note, "8n");
                }
            }}
        >
            {buttonText}
        </button>
    );
};

function getRandomInterval(): string {
    const INTERVALS = [
        "1P",
        "2M",
        "2m",
        "3M",
        "3m",
        "4P",
        "5P",
        "6M",
        "6m",
        "7M",
        "7m",
    ];

    const INTERVAL_INDEX = Math.floor(Math.random() * INTERVALS.length);

    return INTERVALS[INTERVAL_INDEX];
}

function flipInterval(interval: string): string {
    const NAME = interval.substring(1, 2);
    const QUALITY = interval.substring(0, 1);

    return NAME + QUALITY;
}

export const IntervalPlayer: React.FC = () => {
    const [interval, setInterval] = useState<{
        name: string;
        firstNote: string;
        secondNote: string;
    }>({ name: "", firstNote: "", secondNote: "" });

    // if the interval changes
    useEffect(() => {
        playInterval();
    }, [interval]);

    function playInterval(): void {
        if (interval.name !== "") {
            synth.triggerAttackRelease(interval.firstNote, "8n", Tone.now());
            synth.triggerAttackRelease(
                interval.secondNote,
                "8n",
                Tone.now() + 0.5
            );
        }
    }

    function handleClick(intervalType: string): void {
        switch (intervalType) {
            case "random":
                const INTERVAL_NAME = getRandomInterval();
                const FIRST_NOTE = getRandomNote();
                const SECOND_NOTE = Note.transpose(FIRST_NOTE, INTERVAL_NAME);

                setInterval({
                    name: INTERVAL_NAME,
                    firstNote: FIRST_NOTE,
                    secondNote: SECOND_NOTE,
                });
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <h2>Interval Player</h2>
            <p>
                {interval.firstNote} - {interval.secondNote}
            </p>
            <p>{flipInterval(interval.name)}</p>
            <button
                onClick={() => {
                    handleClick("random");
                }}
            >
                Random
            </button>
            <NotePlayerButton
                note={interval.firstNote}
                buttonText={interval.firstNote}
            />
            <NotePlayerButton
                note={interval.secondNote}
                buttonText={interval.secondNote}
            />
        </div>
    );
};
