import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import { ToastContainer } from 'react-toastify'
import CommitVoteForm from "./VoterDashComps/CommitVoteForm"
import Navigation from "./Navigation"
import ClockHeading from "./subComponents/ClockHeading"
import BallotInfo from "./subComponents/BallotInfo"
import ProposalForm from "./VoterDashComps/ProposalForm"

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, timeLeft, stage }) => {

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
              
              {stage === "Proposal" ? 
                <ProposalForm 
                  drizzle={drizzle} 
                  drizzleState={drizzleState}
                />
                :
                stage === "Commitment" ?
                <CommitVoteForm
                  drizzle={drizzle} 
                  drizzleState={drizzleState}
                />
                : <p>Hey!</p>}
              
              
          </div> 
      </div>
    </div>
  )
};
