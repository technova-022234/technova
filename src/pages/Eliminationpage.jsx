import React from "react";

const EliminationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center p-6">
      {/* Mission Failed Text */}
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 animate-pulse">
        MISSION FAILED
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-lg">
        You have encountered a critical failure. The mission cannot continue.
        <br /> Preparing for emergency re-entry to Earth...
      </p>

      {/* Animated Earth GIF */}
      <div className="relative mt-10">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Rotating_earth_%28large%29.gif"
          alt="Rotating Earth"
          className="w-48 h-48 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default EliminationPage;
