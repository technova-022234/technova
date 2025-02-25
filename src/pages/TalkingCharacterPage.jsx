import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

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
      "The coordinates of the zenithium have been uncovered. Look—the red circle indicates a firewall that may reveal the truth of alien life. We need to uncover the mystery.",
    character: "/images/Scientist.png",
    overlay: "redCircle",
  },
  // Scene 2: New image with another character announcing the space mission
  {
    type: "image",
    src: "/images/laboratory2.webp",
    dialogue:
      "A space mission has been initiated to solve the mystery – and you will be joining the journey.",
    character: "/images/Scientist.png",
  },
  // Scene 3: Spaceship launching video with overlay dialogue (looping)
  {
    type: "video",
    src: "/videos/spaceship-launch.mp4",
    autoAdvance: true,
    dialogue: "We have successfully launched and are on our mission.",
    character: "/images/astronaut.png",
  },
  // Scene 4: Asteroid approaching video with dialogue (looping).
  // Pressing Enter (or clicking) on this scene will navigate to "level1".
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
          {...(sceneIndex === 0
            ? { onEnded: advanceScene }
            : { loop: true })}
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
      {currentScene.overlay === "redCircle" && (
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
      )}
    </div>
  );
};

export default CinematicSequence;
