import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TalkingCharacterPage = () => {
  // Array of dialogue texts
  const dialogues = [
    "Hello, adventurer!",
    "Welcome to our world!",
    "Beware the dangers ahead.",
    "Good luck on your journey!"
  ];

  // State to track which dialogue is currently shown
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const dialogueRef = useRef(null);

  // Function to handle dialogue change
  const handleNextDialogue = (e) => {
    // Prevent event propagation if the click came from inside a child element
    if (e) e.stopPropagation();
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
  };

  // Animate the dialogue bubble whenever the dialogue changes
  useEffect(() => {
    gsap.fromTo(
      dialogueRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
    );
  }, [dialogueIndex]);

  return (
    // Outer container: clicking anywhere here (except on child elements) triggers dialogue change
    <div
      className="relative w-screen h-screen overflow-hidden"
      onClick={handleNextDialogue}
    >
      {/* Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/path/to/your/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        
        src="/images/image1.jpg"/>

      {/* Character & Dialogue Container */}
      <div
        className="absolute bottom-5 left-5 right-5 flex items-center"
        // Prevent clicks on this container from bubbling to the outer container
        onClick={(e) => e.stopPropagation()}
      >
        {/* Character Image (moved more to the left) */}
        <img
          src="/images/Character.png"
          alt="Character"
          className="w-48 mr-4"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Dialogue Bubble and Next Button */}
        <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Dialogue Bubble */}
          <div
            ref={dialogueRef}
            className="px-8 py-4 bg-white bg-opacity-80 rounded-lg shadow-md"
          >
            <p className="text-gray-800 text-left">
              {dialogues[dialogueIndex]}
            </p>
          </div>
          {/* Next Button */}
          <button
            onClick={handleNextDialogue}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalkingCharacterPage;
