import React from "react"
import { Button, Card, Nav } from 'react-bootstrap';

export default ({ hash }) => {
    if (hash === '#voterInfo' || hash === '') {
        return (
            <Card.Body>
                <Card.Title>Voting process explained</Card.Title>
                <Card.Text>
                To access the <strong>Voter Dashboard</strong> you need an approved account
                for more information refer to the <strong>Guests</strong> tab. <br /> <br />
                The voting process consists of <strong>three stages</strong>:
                <ul>
                    <li>Proposal - put forward candidacies (Stage access configured by Admin)</li>
                    <li>Commitment - commit your vote and use a passoword to keep it a secret!</li>
                    <li>Reveal - all voting is frozen and final results are revealed</li>
                </ul> 
                Each stage limits the voters' actions to relevant actions, different contract calls 
                will be reverted! 
                <br />
                <br />
                The <strong>Voter Dashboard</strong> provides users with a few key pieces of information.
                This include the list of current approved candidates, the maximum number of votes each voter
                has at their disposal, how many winners will be elected by the ballot and finally a 
                <strong> required stake amount</strong>. The stake represents the amount of ETH that the voter
                has to lend to secure his vote and it will be automatically returned by the contract on
                <strong> Reveal</strong>. This reduces the chances for vote manipulation by ensuring all 
                votes are revealed!
                </Card.Text>
                <Button href="/voterView" variant="primary">Go to Voter Dashboard!</Button>
            </Card.Body> 
        )
    } else if (hash === '#guestInfo') {
        return (
            <Card.Body>
                <Card.Title>How to participate in this ballot?</Card.Title>
                <Card.Text>
                Participating in any vote requires an approved ethereum account, 
                any interaction with the contract by accounts that have ot been granted access
                will be reverted and result in a gas fee for the sender!
                <br />
                <br />
                If you dont already own a whitelisted account you can apply by going to the
                <a href="/guestView"> Apply for voting access</a> page.
                <br />
                <p>Results are visible for all accounts after the end of the ballot,
                    to see the stage of the ballot and the results after reveal head ot <a href="/results">Results</a>
                </p>
                </Card.Text>
                <Button href="/guestView" variant="primary">Apply for rights!</Button>
            </Card.Body> 
        ) 
    }  else {
        return (
            <Card.Body>
                <Card.Title>Admin: tools and tasks!</Card.Title>
                <Card.Text>
                <p>As the admin of this ballot your responsibilities do not end with the
                contract deployment, there are a few key tasks to perform!</p>
                <p>First one is to admit new accounts to the vote by granting voter rights as you see fit!</p>
                <p>Next once the reveal stage is over you are the only one who  can reveal who won the ellecton</p>
                Finally, while the rest of the participants can see who won, you have access to a few
                extra statistics meant to help you with the decision making process, you can decide to share those,
                after the end of the ballot.
                <br />
                <br />
                <p>All of these can be performed in the <a href="/adminView"><strong>Admin Dashboard</strong></a>,
                see you there!
                </p>
                </Card.Text>
                <Button href="/guestView" variant="primary">Apply for rights!</Button>
            </Card.Body> 
        ) 
    }

}
  