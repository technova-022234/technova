import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loadingpage = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative h-screen bg-black text-white bg-cover bg-center" 
      style={{ backgroundImage: "url('images/loadingpage1.jpg')" }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl font-bold mb-4">TECH NOVA</h1>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-60 h-7 bg-gray-700 rounded-full overflow-hidden relative" >
        {progress < 100 ? (
          <>
            <div
              className="h-full bg-blue-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-white font-semibold">
              {progress}%
            </span>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="w-full h-full bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Explore
          </button>
        )}
      </div>
    </div>
  );
};

export default Loadingpage;
