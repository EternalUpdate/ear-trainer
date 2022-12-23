import React, { useState, useEffect } from "react";
import { synth, getRandomNote } from "../utils/RandomMusic";
import { NotePlayerButton } from "./NotePlayerButton";


export function RandomNoteGenerator() {
    const [note, setNote] = useState<string>("");

    // when note changes
    useEffect(() => {
        if (note !== "") {
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
}
;
