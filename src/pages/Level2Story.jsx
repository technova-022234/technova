import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const scenes = [
    {
        type: "video",
        src: "/videos/asteroid_falling.mp4",
        autoAdvance: true,
    },
    {
        type: "image",
        src: "/images/laboratory.webp",
        dialogue:
            "The coordinates of the zenithium have been uncovered. Look—the red circle indicates a firewall that may reveal the truth of alien life. We need to uncover the mystery.",
        character: "/images/Scientist.png",
        overlay: "redCircle",
    },
    {
        type: "image",
        src: "/images/laboratory2.webp",
        dialogue:
            "A space mission has been initiated to solve the mystery – and you will be joining the journey.",
        character: "/images/Scientist.png",
    },
    {
        type: "video",
        src: "/videos/spaceship-launch.mp4",
        autoAdvance: true,
        dialogue: "We have successfully launched and are on our mission.",
        character: "/images/astronaut.png",
    },
    {
        type: "video",
        src: "/videos/asteroids.mp4",
        autoAdvance: true,
        dialogue:
            "We have entered the asteroid belt—we need to change our navigation to get out of this situation.",
        character: "/images/astronaut.png",
        onComplete: "navigate",
    },
];

const Level2Story = () => {
    const [sceneIndex, setSceneIndex] = useState(0);
    const dialogueRef = useRef(null);
    const navigate = useNavigate();

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
            navigate("/level3");
        }
    };

    const currentScene = scenes[sceneIndex];

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
                    className="absolute bottom-0 left-10 right-10 flex items-center"
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
                            <p className="text-blue-300 text-xl text-left font-mono">
                                {currentScene.dialogue}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Level2Story;
