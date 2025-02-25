import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const Level3 = () => {
  // Define the questions and hacking statements.
  const questions = [
    "who are you",
    "what is your mission",
    "enter the passcode",
  ];

  const hackingStatements = [
    "Accessing system files...",
    "Bypassing firewall...",
    "Decrypting secure data...",
    "Loading modules...",
    "Initializing hack...",
    "Extracting data packets...",
    "System override complete!",
  ];

  const totalRings = 3; // Total number of firewall rings

  // State for tracking questions, user input, hacking animation text,
  // whether hacking is in progress, the number of remaining rings,
  // and which ring should flicker.
  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [hackingText, setHackingText] = useState("");
  const [isHacking, setIsHacking] = useState(false);
  const [remainingRings, setRemainingRings] = useState(totalRings);
  const [flickerRingIndex, setFlickerRingIndex] = useState(null);

  // Fisher-Yates shuffle to randomize the hacking statements.
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // When the user presses Enter, start the hacking text animation.
  // (Do not trigger the ring flicker yet.)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && !isHacking) {
      const shuffled = shuffleArray(hackingStatements);
      const allStatements = shuffled.join("\n");
      setHackingText(allStatements);
      setIsHacking(true);
    }
  };

  // This function is called when the hacking text animation completes.
  // It starts the flicker animation on the appropriate ring and, after the flicker,
  // removes the ring.
  const handleHackingComplete = () => {
    // Determine which ring to flicker based on the number of remaining rings.
    const ringToFlicker = totalRings - remainingRings;
    setFlickerRingIndex(ringToFlicker);

    // Wait for the flicker animation to complete (600ms) before removing the ring.
    setTimeout(() => {
      // Remove one firewall ring.
      setRemainingRings((prev) => prev - 1);
      // Clear the flicker flag.
      setFlickerRingIndex(null);
      // Reset the input and hacking text.
      setInputValue("");
      setHackingText("");
      // Move to the next question if available.
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prev) => prev + 1);
      }
      setIsHacking(false);
    }, 1600);
  };

  return (
    <div className="flex h-screen items-center justify-around">
      {/* Left container: Firewall rings */}
      <div className="relative h-[450px] w-[450px] bg-black flex items-center justify-center">
        <div className="relative h-[300px] w-[300px]">
          {remainingRings === 3 && (
            <div
              className={`absolute inset-0 border-2 border-green-600 rounded-full ${
                flickerRingIndex === 0 ? "animate-flicker" : ""
              }`}
            ></div>
          )}
          {remainingRings >= 2 && (
            <div
              className={`absolute inset-0 m-auto h-[200px] w-[200px] border-2 border-green-600 rounded-full ${
                flickerRingIndex === 1 ? "animate-flicker" : ""
              }`}
            ></div>
          )}
          {remainingRings >= 1 && (
            <div
              className={`absolute inset-0 m-auto h-[100px] w-[100px] border-2 border-green-600 rounded-full ${
                flickerRingIndex === 2 ? "animate-flicker" : ""
              }`}
            ></div>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[200px] w-[200px] border-2 border-green-600 rounded-full animate-radar"></div>
        </div>
      </div>

      {/* Right container: Question prompt, input, and hacking animation */}
      <div className="h-[500px] w-[800px] bg-black p-2">
        {/* If not hacking and no hacking text, display the current question and input */}
        {!isHacking && hackingText === "" ? (
          <div>
            <p className="text-green-400">
              {">"} {questions[questionIndex]}
            </p>
            <div className="flex text-green-400 gap-2 mt-4">
              <span>{">"}</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none"
                autoFocus
              />
            </div>
          </div>
        ) : (
          // Display the hacking text animation.
          <div className="mt-4 text-green-400 font-mono whitespace-pre-wrap">
            <TypeAnimation
              sequence={[
                hackingText,
                () => {
                  // Once the hacking text finishes, trigger the ring flicker.
                  handleHackingComplete();
                },
              ]}
              wrapper="div"
              cursor={true}
              repeat={0}
              className="text-green-400"
            />
          </div>
        )}

        {/* Final message after all questions have been answered */}
        {questionIndex === questions.length && hackingText === "" && (
          <p className="mt-4 text-green-400">All challenges completed.</p>
        )}
      </div>
    </div>
  );
};

export default Level3;
