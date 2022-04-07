import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import Navigation from "./Navigation"
import ClockHeading from "./subComponents/ClockHeading"
import VotingResults from "./subComponents/VotingResults"


const { ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, timeLeft, stage }) => {    
    const [winners, setWinners] = React.useState([])

    React.useEffect(() => {
        drizzle.contracts.CommitRevealElections.methods
            .returnWinners().call()
            .then(res => {
                setWinners(res)
            })
            .catch(err => {
                const regExp = /"message":(".*?")/ig
                const error = regExp.exec(err.message)[1]

                toast.error(error, { position: toast.POSITION.TOP_RIGHT })
            })
        
    }, [stage])

    return (
        <div>
        <Navigation />
        <div className="App">
            <ToastContainer />
            <ClockHeading 
                drizzle={drizzle}
                drizzleState={drizzleState}
                timeLeft={timeLeft}
                stage={stage}
            />
            <div className="section">
                {
                stage === "Loading" ?
                <p>Loading...</p>
                :
                stage != "Vote Over" ? 
                <h4>Voting still in process! <a href="/">Back to homepage</a></h4>
                :
                stage === "Vote Over" && winners.length === 0 ? 
                <h4>The Admin has not revealed final results! <a href="/">Back to homepage</a></h4>
                :
                <VotingResults
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    winners={winners}
                />
                }
            </div> 
        </div>
        </div>
    )
};
