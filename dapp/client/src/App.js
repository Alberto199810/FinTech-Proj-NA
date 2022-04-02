import React from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

export default function App() {
  const [state, setState] = React.useState({ storageValue: 0, web3: null, accounts: null, contract: null })

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
    async function runExample (accounts, contract) {

      await contract.methods.set(5).send({ from: accounts[0] })
      const response = await contract.methods.get().call()
    
      setState(value => ({ ...value, storageValue: response }))
    };
    if(state.accounts != null && state.contract != null) {
      runExample(state.accounts, state.contract);
    }
  }, [state.accounts, state.contract])

  

  if (!state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  } else {
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {state.storageValue}</div>
      </div>
    )
  }
}