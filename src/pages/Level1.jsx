import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { completeLevel } from "../redux/progressSlice";
import { useNavigate } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import SensorSystem from "./logicgatescomponent";
import DragAndDropImages from "./DragImage";
import Distance from "./Distancecalculation";

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

const QuestionLeftPanel = ({ questionIndex }) => {
    // Customize the content based on the question number
    switch (questionIndex) {
        case 0:
            return <GraphComponent />;
        case 1:
            return <SensorSystem />;
        case 2:
            return <Distance />;
        case 4:
            return (
                <div className="w-full h-full">
                    <DragAndDropImages />
                </div>
            );
        default:
            return (
                <div className="p-8 text-white">
                    <h3 className="text-3xl font-bold mb-4">Space Explorer</h3>
                    <p>Good luck, space explorer!</p>
                </div>
            );
    }
};

const SpaceshipConsole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        const saved = localStorage.getItem("currentQuestionIndex");
        return saved ? JSON.parse(saved) : 0;
    });
    const [answer, setAnswer] = useState("");
    const [hintsRevealed, setHintsRevealed] = useState(0);

    const [score, setScore] = useState(() => {
        const saved = localStorage.getItem("score");
        return saved ? JSON.parse(saved) : 0;
    });
    const [feedback, setFeedback] = useState("");

    const [userAnswers, setUserAnswers] = useState(() => {
        const saved = localStorage.getItem("userAnswers");
        return saved ? JSON.parse(saved) : {};
    });
    const [hintsState, setHintsState] = useState(() => {
        const saved = localStorage.getItem("hintsState");
        return saved ? JSON.parse(saved) : {};
    });
    const [submittedQuestions, setSubmittedQuestions] = useState(() => {
        const saved = localStorage.getItem("submittedQuestions");
        return saved ? JSON.parse(saved) : {};
    });

    const [levelComplete, setLevelComplete] = useState(() => {
        const saved = localStorage.getItem("levelComplete");
        return saved ? JSON.parse(saved) : false;
    });

    // Level completion check
    useEffect(() => {
        const allCorrect = questions.every(
            (_q, index) => submittedQuestions[index] === true
        );
        if (allCorrect && levelComplete) {
            dispatch(completeLevel("level1"));
        }
        if (allCorrect && !levelComplete) {
            alert("Level complete!");
            setLevelComplete(true);
            localStorage.setItem("levelComplete", JSON.stringify(true));
            dispatch(completeLevel("level1"));
            navigate("/level1story");
        }
    }, [submittedQuestions, levelComplete, dispatch, navigate]);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        localStorage.setItem(
            "currentQuestionIndex",
            JSON.stringify(currentQuestionIndex)
        );
    }, [currentQuestionIndex]);

    useEffect(() => {
        localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    }, [userAnswers]);

    useEffect(() => {
        localStorage.setItem("hintsState", JSON.stringify(hintsState));
    }, [hintsState]);

    useEffect(() => {
        localStorage.setItem(
            "submittedQuestions",
            JSON.stringify(submittedQuestions)
        );
    }, [submittedQuestions]);

    useEffect(() => {
        localStorage.setItem("score", JSON.stringify(score));
    }, [score]);

    useEffect(() => {
        setAnswer(userAnswers[currentQuestionIndex] || "");
        setHintsRevealed(hintsState[currentQuestionIndex] || 0);
        setFeedback("");
    }, [currentQuestionIndex, userAnswers, hintsState]);

    const handleHintReveal = () => {
        if (
            submittedQuestions[currentQuestionIndex] ||
            hintsRevealed >= currentQuestion.hints.length
        )
            return;

        const newHintsRevealed = hintsRevealed + 1;
        setHintsRevealed(newHintsRevealed);
        setHintsState((prev) => ({
            ...prev,
            [currentQuestionIndex]: newHintsRevealed,
        }));
    };

    const handleAnswerChange = (e) => {
        const newAnswer = e.target.value;
        setAnswer(newAnswer);
        setUserAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: newAnswer,
        }));
    };

    const handleSubmitAnswer = async () => {
        if (submittedQuestions[currentQuestionIndex]) return;

        const normalizedAnswer = answer.trim().toLowerCase();
        const normalizedCorrect = currentQuestion.correctAnswer.toLowerCase();
        const questionScore = Math.max(5 - hintsRevealed, 0);

        if (normalizedAnswer === normalizedCorrect) {
            const newTotalScore = score + questionScore;
            setScore(newTotalScore);
            setFeedback(`Correct! You earned ${questionScore} marks.`);
            setSubmittedQuestions((prev) => ({
                ...prev,
                [currentQuestionIndex]: true,
            }));
            const finalAnswer = `✔ Correct! (${currentQuestion.correctAnswer})`;
            setUserAnswers((prev) => ({
                ...prev,
                [currentQuestionIndex]: finalAnswer,
            }));
            setAnswer(finalAnswer);
            const now = new Date();
            const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
            const istTime = new Date(utcTime + 5.5 * 60 * 60000);
            const email = localStorage.getItem("userEmail");
            try {
                const response = await fetch(
                    "http://localhost:5000/api/level1/submit",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email,
                            score: newTotalScore,
                            submissionTime: istTime.toISOString(),
                        }),
                    }
                );
                const data = await response.json();
                console.log("Level1 update:", data);
            } catch (error) {
                console.error("Error updating level1 score:", error);
            }
        } else {
            setFeedback("Incorrect. Keep trying, space explorer!");
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            completeLevelIfAllCorrect();
        }
    };

    const completeLevelIfAllCorrect = () => {
        const allCorrect = questions.every(
            (_q, index) => submittedQuestions[index] === true
        );
        if (allCorrect && !levelComplete) {
            alert("Level complete!");
            setLevelComplete(true);
            localStorage.setItem("levelComplete", JSON.stringify(true));
            dispatch(completeLevel("level1"));
            navigate("/level2");
        } else if (!allCorrect) {
            setFeedback(
                "Level not complete: please ensure you answer all questions correctly before completing the level."
            );
        }
    };

    const handleQuestionNavigation = (index) => {
        setCurrentQuestionIndex(index);
    };

    const isSubmitted = submittedQuestions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-cover bg-center bg-[url('/images/image2.jpg')] flex ">
            {/* Left Half */}
            <div className="w-[50vw] bg-transparent flex items-center justify-center">
                <QuestionLeftPanel questionIndex={currentQuestionIndex} />
            </div>

            {/* Right Half */}
            <div className="w-1/2 flex flex-col pr-10">
                <div className="flex justify-center gap-6 pt-16">
                    <span className="text-white text-2xl font-bold">
                        Score: {score}
                    </span>
                </div>

                <div className="flex justify-center gap-6 pt-10">
                    {questions.map((q, index) => (
                        <button
                            key={index}
                            onClick={() => handleQuestionNavigation(index)}
                            className={`relative w-16 h-16 flex items-center justify-center text-2xl font-bold ${
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

                <div className="flex-grow flex flex-col items-center justify-center px-4">
                    <div className="bg-transparent backdrop-blur-md bg-opacity-80 p-8 rounded-lg shadow-2xl border border-gray-600 w-full max-w-3xl">
                        {/* Screen area with question and hint request */}
                        <div className="mb-6">
                            <h2 className="text-4xl font-extrabold text-center mb-6 text-pink-400 tracking-wider uppercase">
                                Spaceship Console
                            </h2>
                            <div className="mb-6 flex items-center justify-center">
                                <p className="text-2xl text-center text-white">
                                    {currentQuestion.question}
                                </p>
                                <span
                                    title="Request Satellite Data"
                                    onClick={
                                        !isSubmitted
                                            ? handleHintReveal
                                            : undefined
                                    }
                                    className={`relative ml-3 cursor-pointer ${
                                        isSubmitted ||
                                        hintsRevealed ===
                                            currentQuestion.hints.length
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-yellow-300 hover:text-yellow-500"
                                    }`}
                                    style={
                                        isSubmitted ||
                                        hintsRevealed ===
                                            currentQuestion.hints.length
                                            ? {
                                                  pointerEvents: "none",
                                                  opacity: 0.5,
                                              }
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
                                        {currentQuestion.hints.length -
                                            hintsRevealed}
                                    </span>
                                </span>
                            </div>
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
                                                    [Satellite Signal{" "}
                                                    {index + 1}] - {hint}
                                                </p>
                                            ))}
                                    </div>
                                    <p className="mt-4 text-red-400 italic text-sm">
                                        Warning: Using hints will decrease your
                                        score!
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Answer Input & Navigation */}
                        <div className="mt-6 flex flex-col items-center">
                            <input
                                type="text"
                                value={answer}
                                onChange={handleAnswerChange}
                                placeholder="Enter your answer..."
                                disabled={!!isSubmitted}
                                className="w-full max-w-md p-3 text-xl bg-transparent border-b-2 border-purple-400 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex mt-4 space-x-4">
                                {currentQuestionIndex > 0 && (
                                    <button
                                        onClick={() =>
                                            setCurrentQuestionIndex(
                                                currentQuestionIndex - 1
                                            )
                                        }
                                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-xl font-bold shadow-lg"
                                    >
                                        Previous Question
                                    </button>
                                )}

                                <button
                                    onClick={handleSubmitAnswer}
                                    disabled={!!isSubmitted}
                                    className={`px-6 py-3 rounded text-xl font-bold shadow-lg ${
                                        isSubmitted
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-green-500 hover:bg-green-600"
                                    }`}
                                >
                                    {isSubmitted
                                        ? "Submitted"
                                        : "Submit Answer"}
                                </button>

                                {currentQuestionIndex <
                                    questions.length - 1 && (
                                    <button
                                        onClick={handleNextQuestion}
                                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded text-xl font-bold shadow-lg"
                                    >
                                        Next Question
                                    </button>
                                )}
                            </div>
                        </div>
                        {feedback && (
                            <div className="mt-4 text-xl font-semibold text-center text-yellow-500">
                                {feedback}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpaceshipConsole;
