import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const scenes = [
    {
        type: "image",
        src: "/images/LabCommunication.webp",
        autoAdvance: true,
        dialogue:
            "Communication link to the rocket established. Finally… but why does it feel like someone’s listening?",
        character: "/images/CommsAssistant.png",
    },
    {
        type: "image",
        src: "/images/HighFive.webp",
        dialogue:
            "The first message is in—'1101'. That’s 13 in decimal. A code? A signal? Or a warning…?",
        character: "/images/astronaut.png",
    },
    {
        type: "image",
        src: "/images/ReadyToSpaceWarp.jpg",
        dialogue:
            "Navigation—Check. Communication—Check. Power—Check. Systems are green. We’re clear for warp.",
        character: "/images/astronaut.png",
    },
    {
        type: "image",
        src: "/images/ReadyToSpaceWarp.jpg",
        dialogue:
            "Strap in. We're warping to the next location. No turning back now.",
        character: "/images/astronaut.png",
    },
    {
        type: "video",
        src: "/videos/SpaceWarp.mp4",
        autoAdvance: true,
        dialogue:
            "We’ll reach the next location by 12:00 PM IST. Stay sharp—something tells me this is just the beginning.",
        character: "/images/astronaut.png",
    },
];

// Helper function: Calculate the time left (in milliseconds) until 12:00 PM IST today.
const getWarpTimeLeft = () => {
    const now = new Date();
    // Convert current time to IST using Asia/Kolkata timezone.
    const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istNow = new Date(istString);
    // Create a target date set to today at 12:00 PM IST.
    const target = new Date(istNow);
    target.setHours(17, 15, 0, 0);
    const diff = target - istNow;
    return diff > 0 ? diff : 0;
};

// Helper function to format milliseconds as "mm:ss"
const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Level2Story = () => {
    const [sceneIndex, setSceneIndex] = useState(0);
    const [waiting, setWaiting] = useState(false);
    const dialogueRef = useRef(null);
    const navigate = useNavigate();

    const player1Name = localStorage.getItem("player1") || "Player 1";
    const player2Name = localStorage.getItem("player2") || "Player 2";

    // State for warp countdown (in milliseconds)
    const [warpTimeLeft, setWarpTimeLeft] = useState(getWarpTimeLeft());

    // Animate dialogue on scene change.
    useEffect(() => {
        if (dialogueRef.current) {
            gsap.fromTo(
                dialogueRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
            );
        }
    }, [sceneIndex]);

    // Listen for Enter key to advance scenes.
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                advanceScene();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [sceneIndex, warpTimeLeft]);

    const checkLeaderboardQualification = async () => {
        try {
            const response = await fetch(
                "https://technova-sgyr.onrender.com/api/leaderboard/level2"
            );
            const data = await response.json();
            const leaderboard = data.leaderboard;
            const top10 = leaderboard.slice(0, 5);
            const anyInvalid = top10.some((player) => {
                const level1Time = new Date(
                    player.level1.submissionTime
                ).getTime();
                const level2Time = new Date(
                    player.level2.submissionTime
                ).getTime();
                return isNaN(level1Time) || isNaN(level2Time);
            });

            console.log(anyInvalid)
            
            if (anyInvalid) {
                setWaiting(true);
            } else {
                setWaiting(false);
                const email = localStorage.getItem("email");
                if (email && top10.some((item) => item.email === email)) {
                    localStorage.setItem("level3Qualified", "true");
                    try {
                        await fetch(
                            "https://technova-sgyr.onrender.com/api/update-storage",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    email,
                                    level3Qualified: true,
                                }),
                            }
                        );
                    } catch (updateError) {
                        console.error(
                            "Error updating backend storage:",
                            updateError
                        );
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    };

    const handleFinalNavigation = async () => {
        await checkLeaderboardQualification();
        const qualified = localStorage.getItem("level3Qualified");
        if (!waiting && qualified === "true") {
            navigate("/level2storycontinued");
        } else if(!waiting && qualified === "false") {
            navigate("/eliminationpage");
        }
    };

    // Timer effect: If on the final scene, update the countdown every second.
    useEffect(() => {
        if (sceneIndex === scenes.length - 1) {
            const timer = setInterval(() => {
                const left = getWarpTimeLeft();
                setWarpTimeLeft(left);
                if (left <= 0) {
                    clearInterval(timer);
                    if (!waiting) {
                        handleFinalNavigation();
                    }
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [sceneIndex, waiting, navigate]);

    useEffect(() => {
        if (sceneIndex === scenes.length - 1 && warpTimeLeft <= 0 && waiting) {
            const pollInterval = setInterval(async () => {
                await checkLeaderboardQualification();
                // If waiting becomes false, then all top 10 have valid submission times.
                if (!waiting) {
                    clearInterval(pollInterval);
                    handleFinalNavigation();
                }
            }, 2000);
            return () => clearInterval(pollInterval);
        }
    }, [sceneIndex, warpTimeLeft, waiting, navigate]);

    // Advance scene function. If on last scene, do not advance until the countdown is over.
    const advanceScene = () => {
        if (sceneIndex < scenes.length - 1) {
            setSceneIndex(sceneIndex + 1);
        } else {
            // On the last scene, only navigate if countdown is finished.
            if (warpTimeLeft <= 0 && !waiting) {
                handleFinalNavigation();
            }
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
                    {...(sceneIndex === scenes.length - 1
                        ? {}
                        : { onEnded: advanceScene })}
                    {...{ loop: true }}
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
                            className="relative px-10 py-8 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 bg-opacity-90 rounded-lg shadow-lg w-4/5 border border-blue-400"
                        >
                            {currentScene.character && (
                                <div className="absolute top-0 left-8 mt-2 ml-2 text-blue-300 text-xl font-bold ">
                                    {getDisplayName()}
                                </div>
                            )}
                            <p className="text-blue-300 text-xl text-left font-mono pt-2">
                                {currentScene.dialogue}
                            </p>
                            {/* Show warp countdown only on the last scene */}
                            {sceneIndex === scenes.length - 1 && (
                                <div className="mt-4 text-blue-100 text-lg">
                                    {waiting
                                        ? "Waiting for other players..."
                                        : `Warping will be completed in:${" "} ${formatTime(
                                              warpTimeLeft
                                          )}`}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Level2Story;
