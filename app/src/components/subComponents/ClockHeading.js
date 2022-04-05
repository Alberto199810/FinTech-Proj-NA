import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import Clock from "./Clock"

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, timeLeft, stage }) => {



  return (
      <div>
          <div>
            <h1>{"Welcome to the "}
              {<ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CommitRevealElections"
                method="getTitle"
              />}
            </h1>
            </div>
            <div>
              <h4 className="clocks--title">Current active stage is <strong>{stage}</strong></h4>
                <Clock
                  timeLeft={timeLeft}
                />
          </div>
    </div>
  )
};
