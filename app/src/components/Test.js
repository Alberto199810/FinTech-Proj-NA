import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default function Test({ drizzle, drizzleState }) {
    const[isOwner, setIsOwner] = React.useState("undefined")

    drizzle.contracts.CommitRevealElections.methods.owner().call()
        .then(owner => {
            if(drizzleState.accounts[0] === owner){
                setIsOwner(true)
            }
        })

    return (
        <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
            If the contract was deployed successfully I should be able to see that I am owner.
        </p>
        <div>
            I {isOwner ? 'am' : 'am not'} the owner!
        </div>
        </div>
    )
}