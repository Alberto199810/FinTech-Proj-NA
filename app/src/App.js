import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css'
import VoterView from "./components/VoterView";
import Home from "./components/Home"

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


const App = ({ drizzle, drizzleState }) => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home drizzle={drizzle} drizzleState={drizzleState} />} />
            <Route path='/voterView' element={<VoterView drizzle={drizzle} drizzleState={drizzleState} />} />
        </Routes>
    </Router>
  );
}

export default App;
