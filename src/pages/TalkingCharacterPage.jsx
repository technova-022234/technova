import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TalkingCharacterPage = () => {
  const dialogues = [
    "Hello, adventurer!",
    "Welcome to our world!",
    "Beware the dangers ahead.",
    "Good luck on your journey!"
  ];

  const [dialogueIndex, setDialogueIndex] = useState(0);
  const dialogueRef = useRef(null);

  const handleNextDialogue = () => {
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
  };

  useEffect(() => {
    gsap.fromTo(
      dialogueRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
    );

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleNextDialogue();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [dialogueIndex]);

  return (
    <div className="relative w-screen h-screen overflow-hidden" onClick={handleNextDialogue}>
      <img className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" src="/images/image1.jpg" alt="Background" />
      <div className="absolute bottom-10 left-10 right-10 flex items-center" onClick={(e) => e.stopPropagation()}>
        <img src="/images/Character.png" alt="Character" className="w-48 mr-4" />
        <div ref={dialogueRef} className="px-10 py-8 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 bg-opacity-90 rounded-lg shadow-lg w-4/5 border border-blue-400">
          <p className="text-blue-300 text-xl text-left font-mono">{dialogues[dialogueIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default TalkingCharacterPage;
