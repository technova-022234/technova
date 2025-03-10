import React from 'react';

const specialWords = ["order", "random", "chaos", "harmony", "silence"];
const highlightColors = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-500", "text-purple-500"];

// Utility to generate a random alphanumeric string of a given length.
function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const AntiqueClock = () => {
  // Generate a list of words and insert special words at random positions.
  const content = React.useMemo(() => {
    const totalWords = 200;
    // Randomize the order of the special words.
    const shuffledSpecialWords = [...specialWords].sort(() => Math.random() - 0.5);
    // Choose unique indices for the special words.
    const indicesSet = new Set();
    while (indicesSet.size < specialWords.length) {
      indicesSet.add(Math.floor(Math.random() * totalWords));
    }
    const specialIndices = Array.from(indicesSet).sort((a, b) => a - b);
    const words = [];
    let specialIndex = 0;
    for (let i = 0; i < totalWords; i++) {
      if (specialIndices.includes(i)) {
        words.push({ 
          word: shuffledSpecialWords[specialIndex], 
          special: true, 
          color: highlightColors[specialIndex] 
        });
        specialIndex++;
      } else {
        words.push({ word: generateRandomString(Math.floor(Math.random() * 8) + 3), special: false });
      }
    }
    return words;
  }, []);

  // Build the paragraph as an array of inline spans.
  const paragraph = content.map((item, idx) => (
    <span key={idx} className={item.special ? `${item.color} font-bold text-xl` : ""}>
      {item.word}{" "}
    </span>
  ));

  return (
    <div className="w-[600px] h-[300px] overflow-hidden border-4 border-purple-500 rounded-lg bg-gradient-to-br from-gray-800 to-black p-4 text-white relative">
      {/* Define keyframes for the vertical scrolling */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      {/* Animated container with adjusted horizontal offsets */}
      <div 
        className="absolute"
        style={{
          left: '1rem',  // creates a gap on the left
          right: '1rem', // creates a gap on the right
          animation: "scroll 2s linear infinite"
        }}
      >
        <p style={{ textAlign: "justify" }} className="whitespace-normal">
          {paragraph}
        </p>
        <p style={{ textAlign: "justify" }} className="whitespace-normal">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default AntiqueClock;
