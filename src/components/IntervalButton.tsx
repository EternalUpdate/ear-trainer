import React from "react";
import { synth } from "../utils/RandomMusic";
import { Note } from "@tonaljs/tonal";
import * as Tone from "tone";
import { Interval } from "../types/Interval";

type IntervalButtonProps = {
    interval: Interval;
    handleClick: (name: string) => void;
};

export function playInterval(interval: Interval): void {
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

export function flipInterval(interval: string): string {
    const NAME = interval.substring(1, 2);
    const QUALITY = interval.substring(0, 1);

    return NAME + QUALITY;
}

export function IntervalButton({ interval, handleClick }: IntervalButtonProps) {
    return (
        <button
            onClick={() => {
                handleClick(interval.name);
            }}
        >
            {flipInterval(interval.name)}
        </button>
    );
}
