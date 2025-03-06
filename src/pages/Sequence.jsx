import React from 'react';

function Sequence() {
  const words = ["Order", "Random", "Chaos", "Harmony", "Silence"];

  const handleClick = (word) => {
   // console.log(`Button clicked: ${word}`);
    // Additional behavior can be added here.
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-3"
      style={{
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?space")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {words.map((word) => (
          <button
            key={word}
            onClick={() => handleClick(word)}
            className="relative bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out border border-transparent hover:border-white"
          >
            <span className="font-bold text-lg">{word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sequence;
