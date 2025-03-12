import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HintIcon = ({
    isSubmitted,
    hintsRevealed,
    totalHints,
    openHintsModal,
}) => {
    return (
        <span
            title="Request Satellite Data"
            onClick={!isSubmitted ? openHintsModal : undefined}
            className={`relative ml-3 cursor-pointer ${
                isSubmitted || hintsRevealed === totalHints
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-[#b53bca] hover:text-[#b53bca]"
            }`}
            style={
                isSubmitted || hintsRevealed === totalHints
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
                {totalHints - hintsRevealed}
            </span>
        </span>
    );
};

const RulesSection = () => {
    // Dummy state values for demonstration purposes
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hintsRevealed, setHintsRevealed] = useState(0);
    const totalHints = 3;

    const openHintsModal = () => {
        // For demo: increment hints revealed (simulate hint usage)
        if (hintsRevealed < totalHints) {
            setHintsRevealed(hintsRevealed + 1);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Rules</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>You begin the game with 100 points.</li>
                <li>
                    Correct Answers: Each correct answer adds +5 points to your
                    score.
                </li>
                <li>
                    Wrong Answers: Each wrong answer deducts -2 points from your
                    score.
                </li>
                <li>
                    There is 40 min time limit to complete both Level-1 and 2 (i.e. 12:40PM)
                </li>
                <li>Cost of a Hint: Requesting a hint costs you -1 point.</li>
            </ul>
            <div className="mt-4 flex items-center">
                <span>Request a hint:</span>
                <HintIcon
                    isSubmitted={isSubmitted}
                    hintsRevealed={hintsRevealed}
                    totalHints={totalHints}
                    openHintsModal={openHintsModal}
                />
            </div>
        </div>
    );
};

const InstructionsPageLevel1 = () => {
    const navigate = useNavigate();
    // Function to start level1; replace this with your actual navigation logic.
    const startLevel1 = () => {
        console.log("Starting Level 1...");
        navigate("/level1");
    };

    // Listen for the Enter key press to start the level.
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                startLevel1();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="bg-[url('/images/image2.jpg')] bg-cover bg-center h-screen flex items-center justify-center">
            <div className="bg-black/80 border-2 border-[#00ffea] p-8 rounded-[10px] shadow-[0_0_10px_#00ffea] text-white max-w-[600px] w-[90%]">
                <h1 className="text-center text-[2.5rem] mb-6">Mission</h1>
                <section className="mb-6">
                    <h2 className="text-[1.75rem] mb-2">Description</h2>
                    <p className="text-base leading-6">
                        You've now entered the asteroid belt. Your mission is to
                        solve the upcoming challenges to navigate safely out of
                        the belt and continue your journey.
                    </p>
                </section>
                <section>
                    <RulesSection />
                </section>
                <button
                    onClick={startLevel1}
                    className="mt-6 w-full py-2 px-4 bg-[#00ffeadb] text-black font-bold rounded hover:bg-[#00e0d3] transition duration-300"
                >
                    Start Level 1
                </button>
            </div>
        </div>
    );
};

export default InstructionsPageLevel1;
