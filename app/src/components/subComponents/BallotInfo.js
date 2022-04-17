import React from "react"
import { newContextComponents } from "@drizzle/react-components"

const {ContractData} = newContextComponents;

export default ({ drizzle, drizzleState}) => {
  return (
    <div className="voter--info">
        <div>
            <h3>Candidates:</h3>
            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CommitRevealElections"
                method="showCandidates"
            />
        </div>
        <div>
            <h3>Maximum votes:</h3>
            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CommitRevealElections"
                method="startingVotes"
            />
        </div>
        <div>
            <h3>Number of winners:</h3>
            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CommitRevealElections"
                method="numofWinners"
            />
        </div>
        <div>
            <h3>Required stake:</h3>
            <p>1 ETH</p>
        </div>
    </div>
  )
};


