import React, { useState } from "react";
import "./App.css";
// Components
import QuestionCard from "./components/QuestionCard";
// Util
import { IntervalPlayer, RandomNoteGenerator } from "./utils/RandomMusic";

const TOTAL_QUESTIONS = 10;

function App() {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    const startTrivia = async () => {};

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

    const nextQuestion = () => {};

    return (
        <div className="App">
            <h1>Ear Trainer</h1>
            {/* <button className="start" onClick={startTrivia}>
                Start
            </button>
            <p className="score">Score:</p>
            <p>Loading questions . . .</p>
            <QuestionCard
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
            />
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button> */}
            <RandomNoteGenerator />
            <IntervalPlayer />
        </div>
    );
}

export default App;