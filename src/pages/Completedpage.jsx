import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Completedpage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const level3Completed =
            localStorage.getItem("level3Completed") === "true";

        if (!level3Completed) {
            navigate("/level3"); // Redirect to Level 3 if not completed
        } else {
            const timeoutId = setTimeout(() => {
                localStorage.clear();
            }, 300000); 

            return () => clearTimeout(timeoutId);
        }
    }, [navigate]);
    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen 
      bg-cover bg-center text-white p-4"
            style={{
                backgroundImage: "url('images/image2.jpg')",
            }}
        >
            {/* Mission Completed with Scale & Glow Effect */}
            <h1
                className="text-6xl font-extrabold mb-6 text-cyan-400 
        opacity-0 animate-scale-glow"
            >
                🚀Mission Completed!
            </h1>

            {/* Congratulations with Slide-in from Left */}
            <p className="text-2xl mb-4 text-gray-300 opacity-0 animate-slide-left">
                Congratulations! You have successfully cleared all 3 levels.
            </p>

            {/* Thank You message with Glow Effect */}
            <p className="text-lg text-pink-400 animate-glow">
                Thank you for Playing!
            </p>
        </div>
    );
};

export default Completedpage;
