import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loadingpage = () => {
    const [progress, setProgress] = useState(0);
    const [isTimeReached, setIsTimeReached] = useState(false);
    const navigate = useNavigate();

    // Set the target IST time for the event (6:00 PM IST)
    const targetHour = 17; // 6:00 PM
    const targetMinute = 15;

    // Function to check current IST time
    const checkISTTime = () => {
        const now = new Date();
        // Convert to IST using the Asia/Kolkata timezone
        const istString = now.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
        });
        const istDate = new Date(istString);

        const currentHour = istDate.getHours();
        const currentMinute = istDate.getMinutes();

        // Return true if current IST time is at or after the target time
        return (
            currentHour > targetHour ||
            (currentHour === targetHour && currentMinute >= targetMinute)
        );
    };

    // Progress bar effect
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

    // Check IST time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setIsTimeReached(checkISTTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="relative h-screen bg-black text-white bg-cover bg-center"
            style={{ backgroundImage: "url('images/loadingpage2.jpeg')" }}
        >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <h1 className="text-8xl font-bold mb-4">TECH NOVA</h1>
                {/* Display the event start time */}
                <p className="text-xl mb-8">The event starts at 6:00 PM IST</p>
            </div>
            <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 w-72 h-12 bg-gray-700 rounded-full overflow-hidden">
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
                        onClick={() => navigate("/login")}
                        disabled={!isTimeReached}
                        className={`w-full h-full text-white font-semibold rounded-lg shadow-lg transition ${
                            isTimeReached
                                ? "bg-blue-500 hover:bg-blue-700"
                                : "bg-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Explore
                    </button>
                )}
            </div>
        </div>
    );
};

export default Loadingpage;
