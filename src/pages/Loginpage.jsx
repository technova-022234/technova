import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginpage = ({setUser}) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError("");

        try {
            // Log in the user
            const response = await fetch(
                "http://localhost:5000/api/users/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            console.log("User logged in:", data.user);

            setUser(data.user.email)
            // Set the user's email in localStorage
            localStorage.setItem("userEmail", data.user.email);
            localStorage.setItem("teamName", data.user.teamName);
            localStorage.setItem("player1", data.user.player1);
            localStorage.setItem("player2", data.user.player2);

            // Update or retrieve the backend storage record for this email.
            // This ensures that any existing state for the user is present on the backend.
            const storageResponse = await fetch(
                "http://localhost:5000/api/update-storage",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    // Only send the email; if a record exists, it remains unchanged.
                    body: JSON.stringify({ email: data.user.email }),
                }
            );

            if (!storageResponse.ok) {
                throw new Error("Storage update failed");
            }

            const storageData = await storageResponse.json();
            console.log("Backend storage data retrieved:", storageData.data);

            // Destructure individual keys from the retrieved storage data and set them in localStorage.
            if (storageData.data) {
                const {
                    currentQuestionIndex,
                    score,
                    userAnswers,
                    hintsState,
                    submittedQuestions,
                    levelComplete,
                    puzzleBoard,
                    puzzleMoveCount,
                    puzzleSolved,
                    submissionData,
                } = storageData.data;

                if (currentQuestionIndex !== undefined) {
                    localStorage.setItem(
                        "currentQuestionIndex",
                        JSON.stringify(currentQuestionIndex)
                    );
                }
                if (score !== undefined) {
                    localStorage.setItem("score", JSON.stringify(score));
                }
                if (userAnswers !== undefined) {
                    localStorage.setItem(
                        "userAnswers",
                        JSON.stringify(userAnswers)
                    );
                }
                if (hintsState !== undefined) {
                    localStorage.setItem(
                        "hintsState",
                        JSON.stringify(hintsState)
                    );
                }
                if (submittedQuestions !== undefined) {
                    localStorage.setItem(
                        "submittedQuestions",
                        JSON.stringify(submittedQuestions)
                    );
                }
                if (levelComplete !== undefined) {
                    localStorage.setItem(
                        "levelComplete",
                        JSON.stringify(levelComplete)
                    );
                }
                if (puzzleBoard !== undefined) {
                    localStorage.setItem(
                        "puzzleBoard",
                        JSON.stringify(puzzleBoard)
                    );
                }
                if (puzzleMoveCount !== undefined) {
                    localStorage.setItem(
                        "puzzleMoveCount",
                        JSON.stringify(puzzleMoveCount)
                    );
                }
                if (puzzleSolved !== undefined) {
                    localStorage.setItem(
                        "puzzleSolved",
                        JSON.stringify(puzzleSolved)
                    );
                }

                // Retrieve Level 3 submission data and set it correctly.
                if (submissionData) {
                    const {
                        questionIndex: subQuestionIndex,
                        correctAnswers,
                        submissionTimes,
                        remainingRings,
                    } = submissionData;
                    const level3Data = {
                        questionIndex:
                            subQuestionIndex !== undefined
                                ? subQuestionIndex
                                : 0,
                        correctAnswers:
                            correctAnswers !== undefined ? correctAnswers : 0,
                        submissionTimes:
                            submissionTimes !== undefined
                                ? submissionTimes.map((time) =>
                                      new Date(time).toISOString()
                                  )
                                : [],
                        remainingRings:
                            remainingRings !== undefined ? remainingRings : 3,
                    };
                    localStorage.setItem(
                        "submissionData",
                        JSON.stringify(level3Data)
                    );
                }
            }

            navigate("/nav");
        } catch (err) {
            console.error(err);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-cover bg-center bg-[url('/images/image1.jpg')]">
            <div className="bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 border border-white/30">
                <h1 className="text-4xl text-center text-white font-bold mb-6">
                    LOGIN
                </h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label
                        htmlFor="email"
                        className="text-white font-semibold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 border border-white/30 rounded-lg w-full text-black shadow-md focus:ring-2 focus:ring-purple-300 outline-none"
                    />
                    <label
                        htmlFor="password"
                        className="text-white font-semibold mt-4 mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-3 border border-white/30 rounded-lg w-full text-black shadow-md focus:ring-2 focus:ring-purple-300 outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full mt-6 p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        Login
                    </button>
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Loginpage;
