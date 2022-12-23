import { Note } from "@tonaljs/tonal";
import React from "react";
import { synth } from "../utils/RandomMusic";

type NotePlayerButtonProps = {
    note: string;
    buttonText: string;
};

export function NotePlayerButton({ note, buttonText }: NotePlayerButtonProps) {
    return (
        <button
            onClick={() => {
                if (note !== "") {
                    synth.triggerAttackRelease(Note.simplify(note), "8n");
                }
            }}
        >
            {buttonText}
        </button>
    );
}
;
