import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { generateStore, EventActions } from '@drizzle/store'

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, accounts }) => {

  // destructure drizzle and drizzleState from props
  return (
    <div className="App">
      <ToastContainer />
            <div className="section">
            <h2>Active Account</h2>
            <p>{drizzleState.accounts[0]}</p>
            <h4>Sample form:</h4>

            <ContractForm
                drizzle={drizzle}
                contract="CommitRevealElections"
                method="commitVote"
                sendArgs={{value: 1000000000000000000}}
                labels={["Vote hash", "Number of votes"]}
            />
      </div> 
    </div>
  )
};
