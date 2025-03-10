import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { completeLevel } from "../redux/progressSlice";
import { useNavigate } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import SensorSystem from "./logicgatescomponent";
import DragAndDropImages from "./DragImage";
import Radar from "./Radar";
import AntiqueClock from "./AntiqueClock";

const questions = [
    {
        question: `Navigation Protocol:
Our ship’s advanced navigation system has intercepted encrypted coordinates for critical energy nodes. To plot the most energy‐efficient route connecting all nodes with the least distance possible and safely traverse by covering all points, What is the total weight of this optimized route? (Hover on Edges to get the distance, Answer in word form.)`,
        correctAnswer: "Sixteen",
        hints: [
            "Focus on connecting nodes with minimal weights.",
            "Remember: the goal is to minimize the total energy consumption.",
            "Visualize linking all nodes without cycles.",
            "Optimal connections yield the lowest sum.",
        ],
    },
    {
        question: `Sensor Array Analysis:
Our spacecraft’s sensor suite is evaluating three critical signals. If the circuit gives the positive reading at the end, the system initiates a "Pass" signal; otherwise, it holds with a "Fail". What output does the sensor array deliver?(Pass or Fail)`,
        correctAnswer: "Pass",
        hints: [
            "At least two active signals are needed.",
            "Binary sensor logic is in effect.",
            "Majority rule applies.",
            "Check that two or more inputs are on.",
        ],
    },
    {
        question: `Asteroid Proximity Alert:
Radar has locked onto three asteroids in our flight path. To prioritize evasion measures, identify which asteroid is closest to our rocket(7, 7). Which asteroid is our primary threat?`,
        correctAnswer: "Alpha",
        hints: [
            "Analyze the strength of the radar signals.",
            "The nearest object will return the strongest echo.",
            "Triangulation points to the first detected target.",
            "Alpha usually signifies the primary threat.",
        ],
    },
    {
        question: `Temporal Anomaly Sequence:
Deep within the control room, an antique clock malfunctions, cycling through five cryptic words. A faded note reads:
"When the first hour becomes the last and the last echoes the first, the guardian of paradoxes reveals the path. Choose the word that defies expectation and embraces the unpredictable nature of time."
Which word unlocks the hidden sequence?`,
        correctAnswer: "Chaos",
        hints: [
            "Time can be unpredictable.",
            "Expect the unexpected in this anomaly.",
            "Not sequential but disruptive.",
            "Disorder reveals the truth.",
        ],
    },
    {
        question: `Control Panel Conundrum:
Our vessel boasts five control panels aligned across the cockpit, each dedicated to a unique system: Navigation, Communications, Weapons, Shields, and Engines.
Clues:
• The Navigation panel is immediately to the left of the Engine panel.
• The Communications panel is not adjacent to the Weapons panel.
• The Shields panel is located somewhere to the left of the Communications panel.
• The Engines panel is not in position 3.
• The Weapons panel is immediately to the right of the Shields panel.
• The panel in position 1 is not the Navigation panel.
Determine which function is assigned to the panel in the 4th position.
`,
        correctAnswer: "Engine",
        hints: [
            "Map out the positions logically.",
            "Remember: panels have fixed relative positions.",
            "Clues are key—use process of elimination.",
            "Focus on the sequence from left to right.",
        ],
    },
];

const QuestionLeftPanel = ({ questionIndex }) => {
    switch (questionIndex) {
        case 0:
            return <GraphComponent />;
        case 1:
            return <SensorSystem />;
        case 2:
            return <Radar />;
        case 3:
            return <AntiqueClock />;
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
    const [score, setScore] = useState(() => {
        const saved = localStorage.getItem("score");
        return saved ? JSON.parse(saved) : 100;
    });
    const [answer, setAnswer] = useState("");
    const [hintsRevealed, setHintsRevealed] = useState(0);
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
    const [showHintsModal, setShowHintsModal] = useState(false);

    // Check level completion
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

    // Individual localStorage updates
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

    // New Effect: Consolidate and sync state with backend
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) return;
        const appState = {
            email,
            currentQuestionIndex,
            score,
            userAnswers,
            hintsState,
            submittedQuestions,
            levelComplete,
        };

        // Optionally, store the consolidated state in local storage
        localStorage.setItem("appState", JSON.stringify(appState));

        // Update the backend with the consolidated state
        fetch("https://technova-sgyr.onrender.com/api/update-storage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appState),
        })
            .then((response) => response.json())
            .then((data) => console.log("Backend storage updated:", data))
            .catch((error) =>
                console.error("Error updating backend storage:", error)
            );
    }, [
        currentQuestionIndex,
        score,
        userAnswers,
        hintsState,
        submittedQuestions,
        levelComplete,
    ]);

    // Deduct score when a hint is revealed.
    const handleHintReveal = () => {
        if (
            submittedQuestions[currentQuestionIndex] ||
            hintsRevealed >= currentQuestion.hints.length
        )
            return;
        const hintPenalty = 1; // Deduct 1 point per hint reveal.
        setScore((prevScore) => prevScore - hintPenalty);
        const newHintsRevealed = hintsRevealed + 1;
        setHintsRevealed(newHintsRevealed);
        setHintsState((prev) => ({
            ...prev,
            [currentQuestionIndex]: newHintsRevealed,
        }));
    };

    const openHintsModal = () => {
        if (
            !submittedQuestions[currentQuestionIndex] &&
            hintsRevealed < currentQuestion.hints.length
        ) {
            handleHintReveal();
        }
        setShowHintsModal(true);
    };

    const closeHintsModal = () => {
        setShowHintsModal(false);
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
    
        // Use custom validation for the 5th question (index 4)
        let isCorrect;
        if (currentQuestionIndex === 4) {
            isCorrect = normalizedAnswer.includes("engine");
        } else {
            isCorrect = normalizedAnswer === normalizedCorrect;
        }
    
        if (isCorrect) {
            // Calculate reward based on hints already revealed.
            const questionScore = Math.max(5, 0);
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
    
            // Log the submission time and update on the backend.
            const now = new Date();
            const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
            const istTime = new Date(utcTime + 5.5 * 60 * 60000);
            const email = localStorage.getItem("userEmail");
            try {
                const response = await fetch(
                    "https://technova-sgyr.onrender.com/api/level1/submit",
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
            // Deduct a fixed penalty for a wrong answer.
            const penalty = 2;
            const newTotalScore = score - penalty;
            setScore(newTotalScore);
            setFeedback(
                `Incorrect. ${penalty} marks deducted. Keep trying, space explorer!`
            );
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
        <div className="min-h-screen bg-cover bg-center bg-[url('/images/image2.jpg')] flex">
            {/* Left Panel */}
            <div className="w-[50vw] bg-transparent flex items-center justify-center">
                <QuestionLeftPanel questionIndex={currentQuestionIndex} />
            </div>

            {/* Right Panel: Futuristic Ship Command Console */}
            <div className="w-1/2 flex flex-col pr-10 z-10">
                {/* Header */}
                <div className="flex justify-between items-center pt-16 px-8">
                    {/* Score Display */}
                    <div className="text-[#b53bca] text-2xl font-bold tracking-wider drop-shadow-lg">
                        SCORE: {score}
                    </div>
                    {/* Question Navigation */}
                    <div className="flex gap-4">
                        {questions.map((q, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuestionNavigation(index)}
                                className={`relative w-12 h-12 flex items-center justify-center text-lg font-bold rounded-full border-2 border-[#b53bca] transition-all duration-200 ${
                                    currentQuestionIndex === index
                                        ? "bg-[#b53bca] text-[#efb0fa]"
                                        : "bg-transparent text-[#efb0fa] hover:bg-[#b53bca]"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    {/* Hints Icon */}
                    <span
                        title="Request Satellite Data"
                        onClick={!isSubmitted ? openHintsModal : undefined}
                        className={`relative ml-3 cursor-pointer ${
                            isSubmitted ||
                            hintsRevealed === currentQuestion.hints.length
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-[#b53bca] hover:text-[#b53bca]"
                        }`}
                        style={
                            isSubmitted ||
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
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                            {currentQuestion.hints.length - hintsRevealed}
                        </span>
                    </span>
                </div>

                {/* Main Console Display */}
                <div className="mt-8 flex flex-col items-center justify-center px-4">
                    <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-lg border border-[#b53bca] shadow-2xl w-full max-w-3xl">
                        <h2 className="text-4xl font-extrabold text-center mb-6 text-[#b53bca] tracking-widest">
                            SHIP COMMAND CONSOLE
                        </h2>
                        <div className="mb-6">
                            <p className="text-md text-[#efb0fa] whitespace-pre-line">
                                {currentQuestion.question}
                            </p>
                        </div>

                        {/* Answer Input & Navigation */}
                        <div className="mt-6 flex flex-col items-center">
                            <input
                                type="text"
                                value={answer}
                                onChange={handleAnswerChange}
                                placeholder="Enter your command..."
                                disabled={!!isSubmitted}
                                className="w-full max-w-md p-3 text-xl bg-transparent border-b-2 border-[#b53bca] text-[#efb0fa] rounded focus:outline-none focus:ring-2 focus:ring-[#b53bca]"
                            />
                            <div className="flex mt-4 space-x-4">
                                {currentQuestionIndex > 0 && (
                                    <button
                                        onClick={() =>
                                            setCurrentQuestionIndex(
                                                currentQuestionIndex - 1
                                            )
                                        }
                                        className="px-6 py-3 bg-[#b53bca] hover:bg-[#b53bca] rounded text-xl font-bold shadow-lg"
                                    >
                                        Previous
                                    </button>
                                )}
                                <button
                                    onClick={handleSubmitAnswer}
                                    disabled={!!isSubmitted}
                                    className={`px-6 py-3 rounded text-xl font-bold shadow-lg ${
                                        isSubmitted
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-[#b53bca] hover:bg-[#b53bca]"
                                    }`}
                                >
                                    {isSubmitted ? "Submitted" : "Execute"}
                                </button>
                                {currentQuestionIndex <
                                    questions.length - 1 && (
                                    <button
                                        onClick={handleNextQuestion}
                                        className="px-6 py-3 bg-[#b53bca] hover:bg-[#b53bca] rounded text-xl font-bold shadow-lg"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                        {feedback && (
                            <div className="mt-4 text-xl font-semibold text-center text-[#b53bca]">
                                {feedback}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Popup for Hints */}
            {showHintsModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-900 p-6 rounded-lg border border-[#b53bca] shadow-lg relative max-w-lg w-full mx-4">
                        <button
                            onClick={closeHintsModal}
                            className="absolute top-2 right-2 text-[#efb0fa] hover:text-[#7d258d] text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold mb-2 text-[#ca47e1]">
                            Incoming Transmission:
                        </h3>
                        <div className="bg-[#7d258d] p-4 rounded-lg border border-[#b53bca] shadow-md max-h-80 overflow-y-auto">
                            {currentQuestion.hints
                                .slice(0, hintsRevealed)
                                .map((hint, index) => (
                                    <p
                                        key={index}
                                        className="text-lg text-[#efb0fa] mb-2"
                                    >
                                        [Signal {index + 1}]: {hint}
                                    </p>
                                ))}
                        </div>
                        <p className="mt-4 text-red-400 italic text-sm">
                            Warning: Revealing hints reduces your score!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpaceshipConsole;
