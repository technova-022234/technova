import React, { useState } from "react";
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

    console.log(level1Completed);
    console.log(level2Completed);
    console.log(user);

    return (
        <Router>
            <Routes>
                <Route
                    path="/instructions"
                    element={<InstructionsPageLevel1 />}
                />
                <Route
                    path="/level2instructions"
                    element={<InstructionsPageLevel2 />}
                />
                <Route
                    path="/level3instructions"
                    element={<InstructionsPageLevel3 />}
                />
                <Route path="/" element={<Loadingpage />} />
                <Route
                    path="/login"
                    // Pass setUser to your Loginpage component so it can update the state after a successful login
                    element={
                        !user ? (
                            <Loginpage setUser={setUser} />
                        ) : (
                            <Navigate to="/nav" />
                        )
                    }
                />
                <Route path="/nav" element={<NavPage />} />
                <Route
                    path="/story"
                    element={
                        user ? <CinematicSequence /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/level1story"
                    element={
                        level1Completed ? (
                            <Level1Story />
                        ) : (
                            <Navigate to="/level1" />
                        )
                    }
                />
                <Route
                    path="/level2story"
                    element={
                        level2Completed ? (
                            <Level2Story />
                        ) : (
                            <Navigate to="/level2" />
                        )
                    }
                />
                <Route
                    path="/level2storycontinued"
                    element={
                        level2Completed ? (
                            <Level2StoryContinued />
                        ) : (
                            <Navigate to="/level2" />
                        )
                    }
                />
                <Route path="/leaderboard_level1" element={<Leaderboard />} />
                <Route path="/completedpage" element={<Completedpage />} />
                <Route path="/eliminationpage" element={<EliminationPage />} />

                <Route
                    path="/leaderboard_level2"
                    element={<Level2Leaderboard />}
                />
                <Route
                    path="/leaderboard_level3"
                    element={<Level3Leaderboard />}
                />
                <Route
                    path="/*"
                    element={
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
                                        level2Completed ? (
                                            <Level3 />
                                        ) : (
                                            <Navigate to="/level2" />
                                        )
                                    }
                                />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
