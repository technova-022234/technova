import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RulesSection = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Rules</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>
                    You will be given 3 encrypted words, decrypt the words and enter the passwords
                </li>
                <li>First 2 persons to crack all 3 firewalls win</li>
                <li>You may need to visit back and recall the clues from level 1 and 2</li>
                <li>Hint: All three messages are encrypted by only shifting or substituting</li>
            </ul>
        </div>
    );
};

const InstructionsPageLevel3 = () => {
    const navigate = useNavigate();
    // Function to start level1; replace this with your actual navigation logic.
    const startLevel3 = () => {
        console.log("Starting Level 3...");
        navigate("/level3");
    };

    // Listen for the Enter key press to start the level.
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                startLevel3();
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
                        We have reached the origin of zenitium but is surrounded with fire walls and we need to crack the firewalls. Enter the correct decrypted passwords
                    </p>
                </section>
                <section>
                    <RulesSection />
                </section>
                <button
                    onClick={startLevel3}
                    className="mt-6 w-full py-2 px-4 bg-[#00ffeadb] text-black font-bold rounded hover:bg-[#00e0d3] transition duration-300"
                >
                    Start Level 3
                </button>
            </div>
        </div>
    );
};

export default InstructionsPageLevel3;
