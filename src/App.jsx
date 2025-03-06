import React from "react";
import Loginpage from "./pages/Loginpage";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
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
import GraphComponent from "./pages/GraphComponent";
import SensorSystem from "./pages/logicgatescomponent";
import SpaceshipControlPanel from "./pages/SpaceshipControlPanel";
import DragAndDropImages from "./pages/DragImage";
import Distance from "./pages/Distancecalculation";
import Sequence from "./pages/Sequence";
import Level2Leaderboard from "./pages/Leaderboard_level2";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Loadingpage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/nav" element={<NavPage />} />
                <Route path="/story" element={<CinematicSequence />} />
                <Route path="/level1story" element={<Level1Story />} />
                <Route path="/level2story" element={<Level2Story />} />
                <Route path="/leaderboard_level1" element={<Leaderboard />} />
                <Route path="/leaderboard_level2" element={<Level2Leaderboard />} />
                <Route path="/graph" element={<GraphComponent />} />
                <Route path="/logicgatescomponent" element={<SensorSystem/>} />
                <Route path="/spaceshipconsole" element={<SpaceshipControlPanel />} />
                <Route path="/distancecal" element={<Distance/>} />
                <Route path="/sequence" element={<Sequence />} />
                {/* ✅ Wrap Levels with Navbar */}
                <Route path="/drag" element={<DragAndDropImages />} />
                <Route path="/*" element={
                    <>
                        <TopNavbar /> {/* Ensures navbar is rendered */}
                        <Routes>
                            <Route path="/level1" element={<SpaceshipConsole />} />
                            <Route path="/level2" element={<Puzzle />} />
                            <Route path="/level3" element={<Level3 />} /> 
                        </Routes>
                    </>
                }/>
            </Routes>
        </Router>
    );
};

export default App;


