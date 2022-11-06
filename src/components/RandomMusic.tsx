import { Note, Key, Scale, Chord } from "@tonaljs/tonal";
import React, { useState, useEffect, useCallback } from "react";
import * as Tone from "tone";

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const ACCIDENTALS = ["#", "b", ""];
const INTERVALS = [
    "1P",
    "2m",
    "2M",
    "3m",
    "3M",
    "4P",
    "5P",
    "6m",
    "6M",
    "7m",
    "7M",
];
const synth = new Tone.Synth().toDestination();

/**
 * Returns a random note in scientific notation within a given range as a string.
 * @param startOctave lowest octave
 * @param endOctave highest octave
 * @returns A random note in scientific notation within a given range as a string
 */
function getRandomNote(startOctave: number = 3, endOctave: number = 4): string {
    const OCTAVE =
        Math.floor(Math.random() * (endOctave - startOctave + 1)) + startOctave;

    const LETTER_INDEX = Math.floor(Math.random() * LETTERS.length);
    const ACCIDENTAL_INDEX = Math.floor(Math.random() * ACCIDENTALS.length);

    const NOTE = LETTERS[LETTER_INDEX] + ACCIDENTALS[ACCIDENTAL_INDEX];

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
        <div className="card">
            <h2>Random Note Generator</h2>
            <p>{note}</p>
            <div className="button-holder">
                <button
                    onClick={() => {
                        setNote(getRandomNote());
                    }}
                >
                    Generate new note
                </button>
                <NotePlayerButton note={note} buttonText={"Play note"} />
            </div>
        </div>
    );
};

type NotePlayerButtonProps = {
    note: string;
    buttonText: string;
};

const NotePlayerButton: React.FC<NotePlayerButtonProps> = ({
    note,
    buttonText,
}) => {
    return (
        <button
            onClick={() => {
                if (note !== "new note") {
                    synth.triggerAttackRelease(Note.simplify(note), "8n");
                }
            }}
        >
            {buttonText}
        </button>
    );
};

function getRandomInterval(): string {
    const INTERVAL_INDEX = Math.floor(Math.random() * INTERVALS.length);

    return INTERVALS[INTERVAL_INDEX];
}

function flipInterval(interval: string): string {
    const NAME = interval.substring(1, 2);
    const QUALITY = interval.substring(0, 1);

    return NAME + QUALITY;
}

export const IntervalExplorer: React.FC = () => {
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
            synth.triggerAttackRelease(
                Note.simplify(interval.firstNote),
                "8n",
                Tone.now()
            );
            synth.triggerAttackRelease(
                Note.simplify(interval.secondNote),
                "8n",
                Tone.now() + 0.5
            );
        }
    }

    function handleClick(intervalType: string): void {
        if (intervalType === "random") {
            intervalType = flipInterval(getRandomInterval()); // flipping because will unflip later in general code
        }

        const FIRST_NOTE = getRandomNote();
        const SECOND_NOTE = Note.transpose(FIRST_NOTE, intervalType);

        setInterval({
            name: flipInterval(intervalType),
            firstNote: FIRST_NOTE,
            secondNote: SECOND_NOTE,
        });
    }

    type IntervalButtonProps = {
        interval: string;
    };

    const IntervalButton: React.FC<IntervalButtonProps> = ({ interval }) => {
        interval = flipInterval(interval);

        return (
            <button
                onClick={() => {
                    handleClick(interval);
                }}
            >
                {interval}
            </button>
        );
    };

    const intervalButtons = INTERVALS.map((interval) => {
        return <IntervalButton interval={interval} />;
    });

    return (
        <div className="card">
            <h2>Interval Explorer</h2>
            <p>
                {interval.firstNote} - {interval.secondNote}
            </p>
            <p>{flipInterval(interval.name)}</p>
            <div className="button-holder">
                <NotePlayerButton
                    note={interval.firstNote}
                    buttonText={interval.firstNote}
                />
                <NotePlayerButton
                    note={interval.secondNote}
                    buttonText={interval.secondNote}
                />
            </div>
            <div className="button-holder">
                <button
                    onClick={() => {
                        handleClick("random");
                    }}
                >
                    Random
                </button>
            </div>
            <div className="button-holder"> {intervalButtons}</div>
        </div>
    );
};
