import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import { ToastContainer } from 'react-toastify'
import CommitVoteForm from "./CommitVoteForm"
import Navigation from "./Navigation"
import ErrorBoundary from "./ErrorBoundary"

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, accounts }) => {

  // destructure drizzle and drizzleState from props
  return (
    <div>
      <Navigation />
      <div className="App">
        <ToastContainer />
              <div className="section">
              <h2>Active Account</h2>
              <p>{drizzleState.accounts[0]}</p>
              <h4>Sample form:</h4>

              <CommitVoteForm 
                drizzle={drizzle} 
                drizzleState={drizzleState}
              />
        </div> 
      </div>
    </div>
  )
};
