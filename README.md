# Secure Voting DApp - Rinkeby

<img src="https://img.shields.io/badge/Ethereum-20232A?style=for-the-badge&logo=ethereum&logoColor=white" width="130"> <img src="https://www.herokucdn.com/deploy/button.png" width="145">

Please note that if you want a preview of the website, just visit https://fintech-voting-app.herokuapp.com/ (be sure you're logged in your Metamask account).

## PROJECT DESCRIPTION:
The main scope of the project is a blockchain based electronic voting system. At the state of today, electronic voting has evolved and has entered in the life of many people, but it's still something on which many people still do not rely on due to possible frauds. That's exactly where we want to act: due to the many security and privacy vulnerabilities experienced over time, there's a lot of space for improvements.

By exploiting blockchain distribution and decentralization, along with the Commit - Reveal scheme, we managed to create a Ballot framework where nobody, even considering the total transparency of the blockchain, can retrieve the vote of a person when he/she deposits it. Moreover, it is secure because nobody can cheat on the results, and votes are clear and published on the blockchain. This kind of system would help in many context, both in a corporate scenario and in a political elections context, especially in countries where voting system is doubt.

Our mission is to ensure a clear and transparent voting system where nobody can fake deposited votes (so to avoid manipulation), but also the confidentiality of votes: **nobody (even with a block inspector) will ever have the chance of seeing for whom you committed your vote before the start of the reveal period.**

## BALLOT OPTIONS

The main contract of our project, where almost all the main operations happen is **CommitRevealElections**. Below are presented the most relevant features.

#### IMPORTANT: All the following features are modifiable by the owner of the contract when he/she sets up the constructor for the contract. He/She is totally free of deciding each of these options.

#### TIME PERIODS:
```
● The first one for proposing candidates (in addition to those already selected by the owner of the contract).
● The second for actually committing the vote.
● The third - and last - one for the reveal of the previously committed vote.
● Functions to retrieve the remaining time are always available.
```

#### VOTES:
```
● Each voter can have more than 1 vote. Minimum is 1 but there is no maximum.
```

#### WHITELISTED ADDRESSES:
```
● Admin of the ballot has to set a list of Whitelisted Addresses that will have the right to vote in the ballot.
● If someone wants to enter in the ballot, he/she can ask for voting rights and the admin will decide if to admit him or not. 
```

#### STAKE:
```
● To avoid from having people that strategically decided to not reveal their vote during the reveal period, the admin can require 
  a staking amount. What does it mean? This means that a voter, to deposit his/her vote, will have to stake a certain ETH amount, 
  that will receive back only when he/she will reveal the vote. This is crucial to maintain a fair behaviour in the ballot. 
● Stake amount will be decided by the admin.
```

#### WINNERS:
```
● Number of winners can be decided by the admin of the ballot.
● Winners will be revealed in the App only when the admin will decide to reveal them (never before the reveal period is over).
```

#### CANDIDATES:
```
● Maximum number of candidates can be decided by the admin of the ballot. 
● A set of candidates can be decided directly in the input of the contract. Those candidates cannot be removed later. If the 
  maximum number of candidates is equal to the choices in the set of starting candidates, voters will not have the possibility
  of proposing candidates.
```

#### CHECKS:
```
● Many checks are performed within the contract to ensure that no possible frauds are committed during the ballot. 
```

## APP SETUP

Below, you can find instructions to set up a DApp (with relative UI) for a decentralized secure voting system.

### PRELIMINARY STEPS

1) Create an Heroku account (free account is fine for testing)
2) Install Heroku on your machine: https://devcenter.heroku.com/articles/getting-started-with-python#set-up
3) Create an INFURA account at https://infura.io/

### INSTRUCTIONS

To develop your Heroku App, so that other people are able to vote on your ballot, follow these steps:

1) Clone this repository with `git clone https://github.com/Alberto199810/FinTech-Proj-NA.git`
2) Change your directory in the root of the newly created folder with `cd FinTech-Proj-NA`
3) Once you're located in the repository, add the **.env** file, with:

   INFURA_API_KEY="..." (you can find the Key in the Infura dashboard changing the endpoint in "Rinkeby" and taking the last part of the link)
   
   MNEMONIC="zone seek .." (12 words phrase of your Metamask account)
   
   Example of Infura Key:
   
   <img src="https://github.com/Alberto199810/FinTech-Proj-NA/blob/main/Immagine.png" width="600">

4) In the folder "migrations", change the parameters of the file 3_CommitRevealElections.js and input the parameters of your ballot
5) Now, just run:

   `truffle develop`
   
   `truffle migrate --network rinkeby`

   With these commands, your contract will be developed in the Rinkeby Testnet. It's crucial that your accounts own some Test ETH (you can add some at https://faucets.chain.link/rinkeby).
   
6) Now, go back to the root directory (You can press `Ctrl-d`)
7) Run: `cd app`
8) Once you're in the app folder, execute the following commands:

   `npm install` (to install the necessary packages)

   `heroku login` (So that you connect your Heroku account to the command prompt)
   
   `git init`
   
   `git add .`
   
   `git commit -m "first commit"`
   
   `heroku create your-app-name` (You can customize the app name)
   
   `git push heroku master`
   
9) Once the process is completed, just run:
   
   `heroku open`
   
##### WARNING: If your computer has low memory, you can encounter an error. Just reload the app.

Now that you developed the app, the only thing that you have to do is to share the link among approved voters and start the voting!

## TECH STACK USED:
Frontend:
* [Drizzle](https://trufflesuite.com/drizzle/)
* [Heroku](https://www.heroku.com/)

Backend:
* [Ethereum Blockchain](https://ethereum.org/en/)
* [Solidity](https://docs.soliditylang.org/en/v0.8.11/)
* [Infura](https:https://infura.io) to connect to Ethereum network
* [Rinkeby](https://faucets.chain.link/rinkeby) test network
* [Truffle](https://trufflesuite.com/) to compile and deploy contracts

## REPOSITORY STRUCTURE
* app: Folder containing the structure of the UI. Drizzle was used to set it up 
* contracts: Folder containing Solidity contracts:
  * CommitRevealElections.sol: Main contract with ballot framework.
  * String_Evaluation.sol: Contract useful for function used in CommitRevealElections.sol. Deals mostly with strings interpretation in Solidity
* migrations: Folder containing smart contracts deployed. In 3_CommitRevealElections.js you can set up the constructor for your specific ballot.
* node_modules: Folder containing dependencies.
