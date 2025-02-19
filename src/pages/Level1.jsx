import React, { useState } from "react";

const questions = [
    {
        question: "What is the distance from Earth to the Moon?",
        correctAnswer: "384,400 km",
        hints: [
            "Approximately 384,000 km",
            "About 240,000 miles",
            "It varies slightly over time",
            "Less than 500,000 km",
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        correctAnswer: "Mars",
        hints: [
            "It is the fourth planet from the Sun",
            "Associated with the Roman god of war",
            "It has two small moons",
            "Its surface is rich in iron oxide",
        ],
    },
    {
        question: "What is the largest planet in our Solar System?",
        correctAnswer: "Jupiter",
        hints: [
            "A gas giant",
            "Has a prominent red spot",
            "Over 10 times the diameter of Earth",
            "Has dozens of moons",
        ],
    },
];

const SpaceshipConsole = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [hintsRevealed, setHintsRevealed] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [answeredQuestions, setAnsweredQuestions] = useState({});


    const currentQuestion = questions[currentQuestionIndex];

    const handleHintReveal = () => {
        if (hintsRevealed < currentQuestion.hints.length) {
            setHintsRevealed(hintsRevealed + 1);
        }
    };

    const handleAnswerChange = (e) => setAnswer(e.target.value);

    const handleSubmitAnswer = () => {
        let questionScore = 5 - hintsRevealed;
    
        if (answer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase()) {
            setScore((prevScore) => prevScore + questionScore);
            setFeedback(`Correct! You earned ${questionScore} marks.`);
            setAnsweredQuestions((prev) => ({
                ...prev,
                [currentQuestionIndex]: currentQuestion.correctAnswer,
            }));
            
            // Disable further input if the answer is correct
            setAnswer(`✔ Correct! (${currentQuestion.correctAnswer})`); // Display as read-only
        } else {
            setFeedback("Incorrect. Keep trying, space explorer!");
            setAnswer(""); // Allow retry for incorrect answers
        }
    };
    

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswer(answeredQuestions[currentQuestionIndex + 1] ? `✔ Correct! (${answeredQuestions[currentQuestionIndex + 1]})` : "");
            setHintsRevealed(0);
            setFeedback(""); // Reset feedback
        } else {
            alert("Level complete!");
        }
    };

    const handleQuestionNavigation = (index) => {
        setCurrentQuestionIndex(index);
        setHintsRevealed(0);
        setFeedback("");
        setAnswer(answeredQuestions[index] ? `✔ Correct! (${answeredQuestions[index]})` : "");
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-[url('/images/image2.jpg')] flex flex-col">
            {/* Score Display */}
            <div className="flex justify-center gap-6 pt-6">
                <span className="text-white text-2xl font-bold">
                    Score: {score}
                </span>
            </div>

            {/* Question Navigation */}
            <div className="flex justify-center gap-6 pt-6">
                {questions.map((q, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentQuestionIndex(index);
                            setAnswer("");
                            setHintsRevealed(0);
                            setFeedback(""); // Reset feedback when navigating using stars
                        }}
                        className={`relative w-16 h-16 flex items-center justify-center text-2xl font-bold 
                            ${
                                currentQuestionIndex === index
                                    ? "text-yellow-300"
                                    : "text-gray-500 hover:text-yellow-300"
                            }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 .587l3.668 7.431L24 9.587l-6 5.845L19.335 24 12 19.897 4.665 24 6 15.432 0 9.587l8.332-1.569L12 .587z" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
                            {index + 1}
                        </span>
                    </button>
                ))}
            </div>

            {/* Question Display */}
            <div className="flex-grow flex flex-col items-center justify-center px-4 relative">
                <div className="bg-transparent backdrop-blur-md bg-opacity-80 p-8 rounded-lg shadow-2xl border border-gray-600 w-full max-w-3xl relative">
                    <h2 className="text-4xl font-extrabold text-center mb-6 text-pink-400 tracking-wider uppercase">
                        Spaceship Console
                    </h2>

                    <div className="mb-6 flex items-center justify-center">
                        <p className="text-2xl text-center text-white">
                            {currentQuestion?.question}
                        </p>
                        <span
                            title="Request Satellite Data"
                            className={`relative ml-3 cursor-pointer ${
                                hintsRevealed === currentQuestion.hints.length
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-yellow-300 hover:text-yellow-500"
                            }`}
                            onClick={handleHintReveal}
                            style={
                                hintsRevealed === currentQuestion.hints.length
                                    ? { pointerEvents: "none", opacity: 0.5 }
                                    : {}
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-satellite"
                            >
                                <path d="M13 7 9 3 5 7l4 4" />
                                <path d="m17 11 4 4-4 4-4-4" />
                                <path d="m8 12 4 4 6-6-4-4Z" />
                                <path d="m16 8 3-3" />
                                <path d="M9 21a6 6 0 0 0-6-6" />
                            </svg>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.3 rounded-full text-[10px]">
                                {currentQuestion.hints.length - hintsRevealed}
                            </span>
                        </span>
                    </div>

                    {/* Hints Display */}
                    {hintsRevealed > 0 && (
                        <div className="mt-6 p-4 bg-gray-900 bg-opacity-75 rounded border border-blue-400 shadow-lg animate-fade-in">
                            <h3 className="text-xl font-bold mb-2 text-blue-300">
                                Incoming Transmission:
                            </h3>
                            <div className="bg-blue-900 p-4 rounded-lg border border-blue-600 shadow-md">
                                {currentQuestion.hints
                                    .slice(0, hintsRevealed)
                                    .map((hint, index) => (
                                        <p
                                            key={index}
                                            className="text-lg text-blue-200 animate-pulse mb-2"
                                        >
                                            [Satellite Signal {index + 1}] - {hint}
                                        </p>
                                    ))}
                            </div>
                            <p className="mt-4 text-red-400 italic text-sm">
                                Warning: Using hints will decrease your score!
                            </p>
                        </div>
                    )}

                    {/* Feedback Display */}
                    {feedback && (
                        <div className="mt-4 text-xl font-semibold text-center text-yellow-500">
                            {feedback}
                        </div>
                    )}

                    {/* Answer Input & Buttons */}
                    <div className="mt-6 flex flex-col items-center">
                        <input
                            type="text"
                            value={answeredQuestions[currentQuestionIndex] ? `✔ Correct! (${answeredQuestions[currentQuestionIndex]})` : answer}
                            onChange={handleAnswerChange}
                            placeholder="Enter your answer..."
                            disabled={!!answeredQuestions[currentQuestionIndex]}
                            className="w-full max-w-md p-3 text-xl bg-transparent border-b-2 border-purple-400 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex mt-4 space-x-4">
                            <button
                                onClick={handleSubmitAnswer}
                                disabled={!!answeredQuestions[currentQuestionIndex]}
                                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded text-xl font-bold shadow-lg"
                            >
                                Submit Answer
                            </button>
                            <button
                                onClick={handleNextQuestion}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-xl font-bold shadow-lg"
                            >
                                Next Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpaceshipConsole;
