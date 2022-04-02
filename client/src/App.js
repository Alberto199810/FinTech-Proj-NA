import React from "react";
import SimpleStorageContract from "./contracts/CommitRevealElections.json";
import getWeb3 from "./getWeb3";

import "./App.css";

export default function App() {
  const [state, setState] = React.useState({ isOwner: false, web3: null, accounts: null, contract: null })

  React.useEffect(() => {
    async function web3Init() {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3()
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts()
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId()
        const deployedNetwork = SimpleStorageContract.networks[networkId]
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        
        setState(value => ({ ...value, web3: web3, accounts: accounts, contract: instance }))

      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }

    web3Init()
  }, [])

  React.useEffect(() => {
    async function runExample (contract) {
      const owner = await contract.methods.owner().call()
      
      setState(value => ({ ...value, isOwner: owner}))
    }
    if(state.contract != null) {
      runExample(state.contract);
    }
  }, [state.contract])

  

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  } else {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If the cntract was deployed successfully I should be able to see that I am owner.
        </p>
        <div>
          I {state.isOwner ? 'am' : 'am not'} the owner!
        </div>
      </div>
    )
  }
}