import React from 'react';

const Completedpage = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen 
      bg-cover bg-center text-white p-4"
      style={{
        backgroundImage: "url('images/image2.jpg')",
      }}
    >
      {/* Animated heading */}
      <h1 className="text-5xl font-extrabold mb-6 text-cyan-400">
        Mission Completed!
      </h1>

      {/* Congratulatory messages */}
      <p className="text-2xl mb-4 text-purple-300">
        Congratulations! You have successfully cleared all 3 levels.
      </p>
      <p className="text-xl text-pink-300">
              Thank you for Playing!
      </p>
    </div>
  );
};

export default Completedpage;
