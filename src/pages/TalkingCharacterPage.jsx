import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { TypeAnimation } from "react-type-animation";

const scenes = [
    // Scene 0: Intro video playing full screen (non-looping)
    {
        type: "video",
        src: "/videos/asteroid_falling.mp4",
        autoAdvance: true,
    },
    // Scene 1: Background image with character dialogue about uncovered zenithium coordinates,
    // with a red circle (firewall) overlay
    {
        type: "image",
        src: "/images/laboratory.webp",
        dialogue:
            "We’ve uncovered the coordinates of the Zenithium. See that red circle? It’s a firewall—possibly guarding the truth about alien life. We have to break through it… somehow.",
        character: "/images/Scientist.png",
        overlay: "redCircle",
    },
    // Scene 2: New image with another character announcing the space mission
    {
        type: "image",
        src: "/images/laboratory2.webp",
        dialogue:
            "The space mission has begun. Your expertise is crucial—we need to explore these coordinates and uncover the hidden truth.",
        character: "/images/Scientist.png",
    },
    // Scene 3: Spaceship launching video with overlay dialogue (looping)
    {
        type: "video",
        src: "/videos/spaceship-launch.mp4",
        autoAdvance: true,
        dialogue:
            "The spaceship has launched. All systems are go. Our journey into the unknown begins now.",
        character: "/images/astronaut.png",
    },
    // Scene 4: Asteroid approaching video with dialogue (looping).
    // Pressing Enter (or clicking) on this scene will navigate to "level1".
    {
        type: "video",
        src: "/videos/asteroids.mp4",
        autoAdvance: true,
        dialogue:
            "We've entered the asteroid belt. The path ahead is treacherous—we’ll need precision and nerve to make it through.",
        character: "/images/astronaut.png",
        onComplete: "navigate",
    },
];

const CinematicSequence = () => {
    const [sceneIndex, setSceneIndex] = useState(0);
    const dialogueRef = useRef(null);
    const navigate = useNavigate();

    // Animate dialogue appearance on scene change
    useEffect(() => {
        if (dialogueRef.current) {
            gsap.fromTo(
                dialogueRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
            );
        }
    }, [sceneIndex]);

    // Always listen for Enter key to advance the scene
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                advanceScene();
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [sceneIndex]);

    // Advance to the next scene or navigate if on the last scene
    const advanceScene = () => {
        if (sceneIndex < scenes.length - 1) {
            setSceneIndex(sceneIndex + 1);
        } else {
            // On the last scene, navigate to level1
            navigate("/level1");
        }
    };

    const currentScene = scenes[sceneIndex];

    return (
        <div
            className="relative w-screen h-screen overflow-hidden"
            onClick={advanceScene} // Clicking anywhere advances the scene
        >
            {/* Render video scenes */}
            {currentScene.type === "video" && (
                <video
                    className="w-full h-full object-cover"
                    src={currentScene.src}
                    autoPlay
                    muted
                    playsInline
                    // For the first video, auto-advance on end. For others, loop.
                    {...{ loop: true }}
                />
            )}

            {/* Render image scenes */}
            {currentScene.type === "image" && (
                <img
                    className="w-full h-full object-cover"
                    src={currentScene.src}
                    alt="Scene background"
                />
            )}

            {sceneIndex === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-8 bg-blue-900 bg-opacity-90 border border-blue-500 rounded-md shadow-lg">
                        <TypeAnimation
                            sequence={[
                                "In the year 2145, a mysterious anomaly disrupts the known order of the universe...",
                            ]}
                            speed={50} // Adjust typing speed (ms per character) as desired.
                            cursor={true}
                            repeat={0}
                            className="text-blue-200 text-xl font-mono"
                        />
                    </div>
                </div>
            )}

            {/* Render dialogue and character overlay if provided */}
            {(currentScene.dialogue || currentScene.character) && (
                <div
                    className="absolute bottom-0 left-10 right-10 flex items-center"
                    onClick={(e) => e.stopPropagation()} // Prevents click on dialogue from advancing the scene
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

            {/* Optionally, render any additional overlay elements */}
            {/* {currentScene.overlay === "redCircle" && (
        <div
          className="absolute"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "5px solid red",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )} */}
        </div>
    );
};

export default CinematicSequence;
