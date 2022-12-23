import React, { useState, useEffect } from "react";
import { NotePlayerButton } from "./NotePlayerButton";
import { getRandomInterval } from "../utils/RandomMusic";
import { Interval, INTERVALS } from "../types/Interval";
import { IntervalButton } from "./IntervalButton";
import { playInterval, flipInterval } from "./IntervalButton";

export function IntervalGenerator() {
    const [interval, setInterval] = useState<{
        name: string;
        firstNote: string;
        secondNote: string;
    }>({ name: "", firstNote: "C4", secondNote: "G4" });

    // if the interval changes
    useEffect(() => {
        playInterval(interval);
    }, [interval]);

    function handleClick(name: string): void {
        let newInterval: Interval;

        if (name === "Random") {
            newInterval = getRandomInterval();
        } else {
            newInterval = getRandomInterval(name);
        }

        setInterval({
            name: newInterval.name,
            firstNote: newInterval.firstNote,
            secondNote: newInterval.secondNote,
        });
    }

    const intervalButtons = INTERVALS.map((intervalName) => {
        return (
            <IntervalButton
                interval={getRandomInterval(intervalName)}
                handleClick={() => handleClick(intervalName)}
            />
        );
    });

    return (
        <div className="card">
            <h2>Interval Explorer</h2>
            <p>
                {interval.firstNote} - {interval.secondNote}
            </p>
            <p className="subtext">{flipInterval(interval.name)}</p>
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
                        handleClick("Random");
                    }}
                >
                    Random
                </button>
            </div>
            <div className="button-holder"> {intervalButtons}</div>
        </div>
    );
}
