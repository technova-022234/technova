import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const scenes = [
    {
        type: "image",
        src: "/images/EscapingBelt.jpg",
        autoAdvance: true,
        dialogue:
            "The answers... Sixteen, Pass, Alpha, Chaos, and Engine... Their initials spell 'SPACE'. Could this be more than just coincidence? Feels like a key to something hidden.",
        character: "/images/astronaut.png",
    },
    {
        type: "image",
        src: "/images/EscapingBelt.jpg",
        autoAdvance: true,
        dialogue:
            "Let's not dwell on it now. We’ve barely made it through the asteroid belt in one piece. Focus—we’ve got bigger mysteries ahead.",
        character: "/images/astronaut.png",
    },
    {
        type: "image",
        src: "/images/Communication.jpg",
        autoAdvance: true,
        dialogue:
            "Warning! The communication link is down. Running diagnostics… Let’s hope it’s not sabotage.",
        character: "/images/astronaut.png",
    },
    {
        type: "image",
        src: "/images/scrambled.png",
        autoAdvance: true,
        dialogue:
            "Diagnostics complete. The code’s scrambled—badly. Someone… or something… doesn’t want us to reconnect. We need to piece this together, fast.",
        character: "/images/astronaut.png",
    },
];

const Level1Story = () => {
    const [sceneIndex, setSceneIndex] = useState(0);
    const dialogueRef = useRef(null);
    const navigate = useNavigate();

    const player1Name = localStorage.getItem("player1") || "Player 1";
    const player2Name = localStorage.getItem("player2") || "Player 2";

    useEffect(() => {
        if (dialogueRef.current) {
            gsap.fromTo(
                dialogueRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
            );
        }
    }, [sceneIndex]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                advanceScene();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [sceneIndex]);

    const advanceScene = () => {
        if (sceneIndex < scenes.length - 1) {
            setSceneIndex(sceneIndex + 1);
        } else {
            navigate("/level2instructions");
        }
    };

    const currentScene = scenes[sceneIndex];

    const getDisplayName = () => {
        // Assuming scenes 1 and 2 use player1, and scenes 3 and 4 use player2.
        if (sceneIndex % 2 === 0) {
            return player1Name;
        }
        return player2Name;
    };

    return (
        <div
            className="relative w-screen h-screen overflow-hidden"
            onClick={advanceScene}
        >
            {currentScene.type === "video" && (
                <video
                    className="w-full h-full object-cover"
                    src={currentScene.src}
                    autoPlay
                    muted
                    playsInline
                    {...(sceneIndex === 0
                        ? { onEnded: advanceScene }
                        : { loop: true })}
                />
            )}

            {currentScene.type === "image" && (
                <img
                    className="w-full h-full object-cover"
                    src={currentScene.src}
                    alt="Scene background"
                />
            )}

            {(currentScene.dialogue || currentScene.character) && (
                <div
                    className={`absolute bottom-0 left-10 right-10 flex items-center ${
                        sceneIndex % 2 === 1 ? "flex-row-reverse" : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {currentScene.character && (
                        <img
                            src={currentScene.character}
                            alt="Character"
                            className="w-48 mr-4"
                        />
                    )}
                    {currentScene.dialogue && (
                        <div
                            ref={dialogueRef}
                            className="px-10 py-8 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 bg-opacity-90 rounded-lg shadow-lg w-4/5 border border-blue-400"
                        >
                            {currentScene.character && (
                                <div className="absolute top-0 left-8 mt-2 ml-2 text-blue-300 text-xl font-bold ">
                                    {getDisplayName()}
                                </div>
                            )}
                            <p className="text-blue-300 text-xl text-left font-mono pt-2">
                                {currentScene.dialogue}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Level1Story;
