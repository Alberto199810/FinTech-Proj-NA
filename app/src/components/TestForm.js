import React from "react"
import { newContextComponents } from "@drizzle/react-components"

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
      <div>
            <h4>The owner is:</h4>
            <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CommitRevealElections"
                method="owner"
            />
            <h4>Sample form:</h4>

            <ContractForm
                drizzle={drizzle}
                contract="CommitRevealElections"
                method="commitVote"
                labels={["Vote hash", "Number of votes"]}
            />
      </div> 
  )
};
