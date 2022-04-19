# Voting DApp - Rinkeby

In this repository, you can find a DApp for a decentralized voting system.

## PRELIMINARY STEPS

1) Create an Heroku account (free account is fine for testing)
2) Install Heroku on your machine: https://devcenter.heroku.com/articles/getting-started-with-python#set-up
3) Create an INFURA account at https://infura.io/

To develop your Heroku App, so that other people are able to vote on your ballot, follow the following steps:

1) Clone this repository with `git clone https://github.com/Alberto199810/FinTech-Proj-NA.git`
2) Change your directory in the root of the newly created folder with `cd ...`
3) Once you're located in the repository, add the .env file, with:

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
   
   `heroku create --your-app-name` (You can customize the app name)
   
   `git push heroku master`
   
   Once the process is completed, just run:
   
   `heroku open`
   
### WARNING: If your computer has low memory, you can encounter an error. Just reload the app.

Now that you developed the app, the only thing that you have to do is to share the link among approved voters and start the voting!   
