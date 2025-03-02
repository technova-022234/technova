import React from "react";
import Loginpage from "./pages/Loginpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const App = () => {
    return (
        <div>
            <Router>
                {/* <TopNavbar /> */}
                <Routes>
                    <Route path="/" element={<Loadingpage />} />
                    <Route path="/story" element={<CinematicSequence />} />
                    <Route path="/login" element={<Loginpage />} />
                    <Route path="/nav" element={<NavPage />} />
                    <Route path="/level1" element={<SpaceshipConsole />} />
                    <Route path="/level1story" element={<Level1Story />} />
                    <Route path="/level2" element={<Puzzle />} />
                    <Route path="/level2story" element={<Level2Story /> } />
                    <Route path="/level3" element={<Level3 />} />
                    <Route path="/leaderboard_level1" element={<Leaderboard />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
