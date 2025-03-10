import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import SpaceshipConsole from "./pages/Level1";
import Puzzle from "./pages/Level2";
import CinematicSequence from "./pages/TalkingCharacterPage";
import Loadingpage from "./pages/Loadingpage";
import NavPage from "./pages/NavPage";
import TopNavbar from "./components/TopNavbar";
import Level3 from "./pages/Level3";
import Level1Story from "./pages/Level1Story";
import Level2Story from "./pages/Level2Story";
import Leaderboard from "./pages/Leaderboard_level1";
import Level2Leaderboard from "./pages/Leaderboard_level2";
import Level3Leaderboard from "./pages/Leaderboard_level3";
import Level2StoryContinued from "./pages/Level2storycontinued";
import { useSelector } from "react-redux";
import InstructionsPageLevel2 from "./pages/InstructionsPageLevel2";
import InstructionsPageLevel1 from "./pages/InstructionsLevel1";
import InstructionsPageLevel3 from "./pages/InstructionsLevel3";
import Completedpage from "./pages/Completedpage";
import EliminationPage from "./pages/Eliminationpage";

// General ProtectedRoute for routes available only after the overall event time is reached
const ProtectedRoute = ({ children, isTimeReached }) => {
    if (!isTimeReached) {
        return <Navigate to="/" replace />;
    }
    return children;
};

// ProtectedRouteLevel3 for routes that should be accessible only after the level3 time is reached.
// If the level3 time hasn't been reached, redirect to the level2 story page.
const ProtectedRouteLevel3 = ({ children, isLevel3TimeReached }) => {
    if (!isLevel3TimeReached) {
        return <Navigate to="/level2story" replace />;
    }
    return children;
};

// Target times are defined outside the component so they can be used for both initialization and periodic checking.
// Overall event target (for example, for login and level1/level2 pages)
// Adjust these values as needed.
const targetHour = 20; // Example: 12:00 PM IST
const targetMinute = 1;

// Level3 target time (for level2story continued, level3 instructions, and level3)
const targetHourLevel3 = 21; // Example: 3:00 PM IST
const targetMinuteLevel3 = 0;

// Function to check the current IST time against a target time.
const checkISTTime = (hour, minute) => {
    const now = new Date();
    // Convert current time to IST using Asia/Kolkata timezone
    const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const istDate = new Date(istString);
    const currentHour = istDate.getHours();
    const currentMinute = istDate.getMinutes();
    return (
        currentHour > hour || (currentHour === hour && currentMinute >= minute)
    );
};

const App = () => {
    // Initialize user state from localStorage
    const [user, setUser] = useState(localStorage.getItem("userEmail"));

    // Redux selectors for progress
    const level1Completed =
        useSelector((state) => state.progress.level2) ||
        localStorage.getItem("levelComplete") === "true";
    const level2Completed =
        useSelector((state) => state.progress.level3) ||
        localStorage.getItem("puzzleSolved") === "true";

    // Initialize state for overall event time and level3 time using synchronous check.
    const [isTimeReached, setIsTimeReached] = useState(() =>
        checkISTTime(targetHour, targetMinute)
    );
    const [isLevel3TimeReached, setIsLevel3TimeReached] = useState(() =>
        checkISTTime(targetHourLevel3, targetMinuteLevel3)
    );

    // Update the overall event time every second.
    useEffect(() => {
        const timer = setInterval(() => {
            setIsTimeReached(checkISTTime(targetHour, targetMinute));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Update the level3 time every second.
    useEffect(() => {
        const timerLevel3 = setInterval(() => {
            setIsLevel3TimeReached(
                checkISTTime(targetHourLevel3, targetMinuteLevel3)
            );
        }, 1000);
        return () => clearInterval(timerLevel3);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Loadingpage />} />
                <Route
                    path="/instructions"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <InstructionsPageLevel1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/level2instructions"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <InstructionsPageLevel2 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/level3instructions"
                    element={
                        <ProtectedRouteLevel3
                            isLevel3TimeReached={isLevel3TimeReached}
                        >
                            <InstructionsPageLevel3 />
                        </ProtectedRouteLevel3>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            {!user ? (
                                <Loginpage setUser={setUser} />
                            ) : (
                                <Navigate to="/nav" />
                            )}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/nav"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <NavPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/story"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            {user ? (
                                <CinematicSequence />
                            ) : (
                                <Navigate to="/login" />
                            )}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/level1story"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            {level1Completed ? (
                                <Level1Story />
                            ) : (
                                <Navigate to="/level1" />
                            )}
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/level2story"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <Level2Story />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/level2storycontinued"
                    element={
                        <ProtectedRouteLevel3
                            isLevel3TimeReached={isLevel3TimeReached}
                        >
                            {level2Completed ? (
                                <Level2StoryContinued />
                            ) : (
                                <Navigate to="/level2" />
                            )}
                        </ProtectedRouteLevel3>
                    }
                />
                <Route
                    path="/leaderboard_level1"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <Leaderboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/completedpage" element={<Completedpage />} />
                <Route path="/eliminationpage" element={<EliminationPage />} />

                <Route
                    path="/leaderboard_level2"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <Level2Leaderboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/leaderboard_level3"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <Level3Leaderboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute isTimeReached={isTimeReached}>
                            <>
                                <TopNavbar />
                                <Routes>
                                    <Route
                                        path="/level1"
                                        element={
                                            user ? (
                                                <SpaceshipConsole />
                                            ) : (
                                                <Navigate to="/login" />
                                            )
                                        }
                                    />
                                    <Route
                                        path="/level2"
                                        element={
                                            level1Completed ? (
                                                <Puzzle />
                                            ) : (
                                                <Navigate to="/level1" />
                                            )
                                        }
                                    />
                                    <Route
                                        path="/level3"
                                        element={
                                            <ProtectedRouteLevel3
                                                isLevel3TimeReached={
                                                    isLevel3TimeReached
                                                }
                                            >
                                                {level2Completed ? (
                                                    <Level3 />
                                                ) : (
                                                    <Navigate to="/level2" />
                                                )}
                                            </ProtectedRouteLevel3>
                                        }
                                    />
                                </Routes>
                            </>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
