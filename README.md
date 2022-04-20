# Voting DApp - Rinkeby

Please note that if you want a preview of the website, just visit https://fintech-voting-app.herokuapp.com/.

## BALLOT OPTIONS

The main contract of our project, where almost all the main operations happen is **CommitRevealElections**.
```
TIME PERIODS:
● The first one for proposing candidates (in addition to those already selected by the owner of the contract).
● The second for actually committing the vote.
● The third - and last - one for the reveal of the previously committed vote.

VOTES:
● Each voter can have more than 1 vote. Minimum is 1 but there is no maximum.

WHITELISTED ADDRESSES:
```

#### Please note that all these variables are modifiable by the owner which can decide how long each of this steps should last.


Together with this, a single voter can have more than 1 vote. Again, this approach can be changed but we approached this issue by thinking that in order for the contract to be implementable in various scenarios, allowing for more than one vote could have been very useful.

Then, we thought that the ballot in principle should not be public, in the sense that the owner should be allowed to decide who can and cannot vote. Therefore, only whitelisted addresses (and in turn whitelisted voters) can participate to the ballot. Still, if somebody who thinks of having the right to vote does not have the permission, he/she can ask for his/her right to vote to the owner.
Moving on into the contract, some elements characterizing information about the current status of the vote are developed and then we have defined the functions.
We then pass to define the most important functions of the contract which represent the building block upon which a potential 2.0 version could be implemented in the future.
setCandidates is the first translation in solidity terms of something what we previously introduced: only whitelisted addresses can actually enjoy the ballot in its entirety. Indeed, already from the step of proposing new candidates, we think there is the need of having received the right to participate. Again, a voter can ask for a right he/she thinks of deserving.
Then, when the first period of time has expired, commitVote becomes the running function. Here, it important to add some checks in order to make the contract safe. Indeed, we don’t want voters to provide more votes than the amount they are allowed to and we want that votes are committed in the commit period; neither in advance, nor later. Together with these two elements, we also require to the voter an amount of Eth which is kept at stake up to the end of the ballot. [ALBI AGGIUNGI TU UNA RIGA QUI SUL PERCHE’ QUESTO SIA IMPORTANTE].
For the third period of time, the function revealVote is almost self-explanatory; it implements a structure which allows for the reveal. Again, the same above-mentioned elements to keep the contract safe are defined, with the addition that obviously, in order to be counted as a valid one, a vote should have been committed in time.
Then, we pass to the actual count of the votes where we retrieve the names (and sum the votes) of the voted candidates.
Finally, the winners are revealed with getWinners which starts being the running function only in the moment when the time for revealing period is over.

Together with the most important functions we have previously discussed, other refinements have been implemented for completeness.
Indeed, we allow the Owner to be the only person able to call the functions with onlyOwner and we check if the voter is whitelisted with checkifWhitelisted. We allow people to apply for rights with applyForRights, while listing for the owner those who have applied for rights with showApplierForRights and allowing the owner to provide those rights with giveRightsToAddresses.

Then, we implemented showCandidates which again we think it’s quite self-explanatory as returnWinners. And, votesForACandidate is a valid option for allowing to see the vote for a single candidate once the revealing time is over.
Moreover, we implemented the functions getRemainingTimeForProposal, getRemainingTimeForCommitment and getRemainingTimeForReveal to allow people to understand how much time is left for each of these steps. In particular, these functions end up being very helpful for the app design.


In this repository, you can find a DApp for a decentralized voting system.

## PRELIMINARY STEPS

1) Create an Heroku account (free account is fine for testing)
2) Install Heroku on your machine: https://devcenter.heroku.com/articles/getting-started-with-python#set-up
3) Create an INFURA account at https://infura.io/

## INSTRUCTIONS

To develop your Heroku App, so that other people are able to vote on your ballot, follow these steps:

1) Clone this repository with `git clone https://github.com/Alberto199810/FinTech-Proj-NA.git`
2) Change your directory in the root of the newly created folder with `cd FinTech-Proj-NA`
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
   
   `heroku create your-app-name` (You can customize the app name)
   
   `git push heroku master`
   
9) Once the process is completed, just run:
   
   `heroku open`
   
##### WARNING: If your computer has low memory, you can encounter an error. Just reload the app.

Now that you developed the app, the only thing that you have to do is to share the link among approved voters and start the voting!
