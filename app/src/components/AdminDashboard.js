import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import Navigation from "./Navigation"
import ClockHeading from "./subComponents/ClockHeading"
import BallotInfo from "./subComponents/BallotInfo"
import RevealWin from "./AdminComps/RevealWin"
import { toast, ToastContainer } from "react-toastify"
import VotingStats from "./AdminComps/VotingStats"
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

    // showApplierForRights (giveRightsToAddresses (accepts a list: make a list with checkboxes and send that to the final call))

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
                <BallotInfo 
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                />
                {
                stage === "Loading" ?
                <p>Loading...</p>
                :
                stage != "Vote Over" ? 
                <div>
                </div>
                :
                stage === "Vote Over" && winners.length ===0 ?
                <div>
                    <RevealWin
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                    />
                    <VotingStats
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        winners={winners}
                    />
                </div>
                :
                <div>
                    <VotingResults
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        winners={winners}
                    />
                    <VotingStats
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        winners={winners}
                    />
                </div>
                }           
            </div> 
        </div>
        </div>
    )
};