import React from "react"
import Navigation from "./Navigation"

export default function Home({ drizzle, drizzleState }) {

  return(
    <div>
      <Navigation />
        <div className="App">
          <br/>
          <h2>Welcome to the decentralized voting system of the future!</h2>
          <h4>Currently logged in with account number:</h4>
          <p>{drizzleState.accounts[0]}</p>
          <br />
          <p>Please select the the dashboard your looking for from the menu in the navigation bar!</p>
          
        </div>
    </div>
  )
};
