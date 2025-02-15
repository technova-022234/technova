import React, { useState } from "react";

const questions = [
    {
        question: "What is the distance from Earth to the Moon?",
        hints: [
            "Approximately 384,000 km",
            "About 240,000 miles",
            "It varies slightly over time",
            "Less than 500,000 km",
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        hints: [
            "It is the fourth planet from the Sun",
            "Associated with the Roman god of war",
            "It has two small moons",
            "Its surface is rich in iron oxide",
        ],
    },
    {
        question: "What is the largest planet in our Solar System?",
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

    const currentQuestion = questions[currentQuestionIndex];

    const handleSelectQuestion = (index) => {
        setCurrentQuestionIndex(index);
        setAnswer("");
        setHintsRevealed(0);
    };

    const handleHintReveal = () => {
        if (hintsRevealed < currentQuestion.hints.length) {
            setHintsRevealed(hintsRevealed + 1);
        }
    };

    const handleAnswerChange = (e) => setAnswer(e.target.value);

    const handleSubmitAnswer = () => {
        console.log(`Answer for Q${currentQuestionIndex + 1}: ${answer}`);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswer("");
            setHintsRevealed(0);
        } else {
            alert("Level complete!");
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-[url('/images/image1.jpg')] flex flex-col">
            <div className="flex justify-center gap-6 pt-6">
                {questions.map((q, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectQuestion(index)}
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

            {/* Central spaceship console */}
            <div className="flex-grow flex flex-col items-center justify-center px-4 relative">
                <div className="bg-transparent backdrop-blur-md bg-opacity-80 p-8 rounded-lg shadow-2xl border border-gray-600 w-full max-w-3xl relative">
                    {/* Decorative top gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-t-lg"></div>

                    <h2 className="text-4xl font-extrabold text-center mb-6 text-green-400 tracking-wider uppercase">
                        Spaceship Console
                    </h2>

                    <div className="mb-6 flex items-center justify-center">
                        <p className="text-2xl text-center text-white">
                            {currentQuestion.question}
                        </p>
                        {/* Hint icon with tooltip */}
                        <span
                            title="Contact Earth"
                            className="ml-3 cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-blue-300 hover:text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onClick={handleHintReveal}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
                                />
                            </svg>
                        </span>
                    </div>

                    <div className="mb-6 flex justify-center">
                        <input
                            type="text"
                            value={answer}
                            onChange={handleAnswerChange}
                            placeholder="Enter your answer..."
                            className="w-full max-w-md p-3 text-xl bg-transparent border-b-2 border-purple-400 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-between mx-auto gap-4 w-[80%]">
                        <button
                            onClick={handleSubmitAnswer}
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

                    {/* Display all revealed hints */}
                    {hintsRevealed > 0 && (
                        <div className="mt-6 p-4 bg-transparent bg-opacity-90 rounded border border-yellow-500">
                            <h3 className="text-xl font-bold mb-2 text-yellow-300">
                                Hints:
                            </h3>
                            <ul className="list-disc list-inside space-y-2">
                                {currentQuestion.hints
                                    .slice(0, hintsRevealed)
                                    .map((hint, index) => (
                                        <li
                                            key={index}
                                            className="text-lg text-yellow-200"
                                        >
                                            {hint}
                                        </li>
                                    ))}
                            </ul>
                            <p className="mt-4 text-red-400 italic text-sm">
                                Warning: Using hints will decrease your score!
                            </p>
                        </div>
                    )}

                    {/* Additional decorative spaceship elements */}
                    <div className="absolute -left-10 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="absolute -right-10 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Footer spaceship status */}
            <div className="text-center py-4 text-gray-300">
                <p className="text-sm">
                    Galactic Federation - All systems operational
                </p>
            </div>
        </div>
    );
};

export default SpaceshipConsole;
