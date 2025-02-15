import React from 'react'
import Loginpage from './pages/Loginpage'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Level1 from './pages/Level1'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/level1" element={<Level1 />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App