import React, { useState } from "react";
import "./App.css";
// Components
import {
    IntervalExplorer,
    RandomNoteGenerator,
} from "./components/RandomMusic";

const TOTAL_QUESTIONS = 10;

function App() {
    return (
        <div className="App">
            <h1>Ear Trainer</h1>
            <RandomNoteGenerator />
            <IntervalExplorer />
            <div className="footer">
                <p>
                    Brought to you by{" "}
                    <a
                        href="https://github.com/EternalUpdate"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @EternalUpdate
                    </a>
                </p>
            </div>
        </div>
    );
}

export default App;
