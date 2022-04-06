import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css'
import VoterDashboard from "./components/VoterDashboard";
import Home from "./components/Home"

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


const App = ({ drizzle, drizzleState }) => {
  const calculateTimeLeft = (time) => {
    let difference = time*1000 - +new Date()
    let timeLeft = {}

    if (difference > 0) {
    timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    }
    }

    return timeLeft;
}

  const [timeLeft, setTimeLeft] = React.useState({
                                    timeProposal: {},
                                    timeCommitment: {},
                                    timeReveal: {}
                                  });
  const [stage, setStage] = React.useState("Loading")

  // console.log(!(Object.keys(timeLeft.timeProposal).length === 0 && timeLeft.timeProposal.constructor === Object))

  React.useEffect(() => {
      async function setTimer() {
          const timeProposal = await drizzle.contracts.CommitRevealElections.methods.timeForProposal().call()
          const timeCommitment = await drizzle.contracts.CommitRevealElections.methods.timeForCommitment().call()
          const timeReveal = await drizzle.contracts.CommitRevealElections.methods.timeForReveal().call()
          const timer = setTimeout(() => {
            if (!(Object.keys(timeLeft.timeProposal).length === 0 && timeLeft.timeProposal.constructor === Object)) {
              setStage("Proposal")
            } else if (!(Object.keys(timeLeft.timeCommitment).length === 0 && timeLeft.timeCommitment.constructor === Object)) {
              setStage("Commitment")
            } else if (!(Object.keys(timeLeft.timeReveal).length === 0 && timeLeft.timeReveal.constructor === Object)) {
              setStage("Reveal")
            } else {
              setStage("Vote Over")
            }

            setTimeLeft({
              timeProposal: calculateTimeLeft(timeProposal),
              timeCommitment: calculateTimeLeft(timeCommitment),
              timeReveal: calculateTimeLeft(timeReveal)
            })
          }, 1000)
          return timer
      }

      const timer = setTimer()

      return clearTimeout(timer)
  })

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home drizzle={drizzle} drizzleState={drizzleState} />} />
            
            <Route path='/voterView' element={<VoterDashboard drizzle={drizzle} drizzleState={drizzleState} timeLeft={timeLeft} stage={stage}/>} />
        </Routes>
    </Router>
  );
}

export default App;
