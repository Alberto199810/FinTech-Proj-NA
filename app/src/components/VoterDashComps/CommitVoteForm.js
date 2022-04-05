import React from 'react'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap';

export default function CommitVoteForm({ drizzle, drizzleState }) {
    const utils = drizzle.web3.utils

    const stateApp = {
        vote: "",
        password: "",
        votePoints: 0
    };

    const handleChange = (e) => {
        stateApp[e.target.id] = e.target.value;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const convertedVote = utils.soliditySha3(stateApp.vote + '-' + stateApp.password)

        drizzle.contracts.CommitRevealElections
            .methods.commitVote(convertedVote, stateApp.votePoints)
            .send({value: 1000000000000000000})
            .then(res => console.log(res))
            .catch(err => {
                const regExp = /"message":(".*?")/ig
                const error = regExp.exec(err.message)[1]

                toast.error(error, { position: toast.POSITION.TOP_RIGHT })
            })
    }

    return (
        <Form className="commit-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="string" id="vote" onChange={handleChange} placeholder="Input candidate name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="password" id="password" onChange={handleChange} placeholder="Password" />
          <Form.Text>We do not store your passwords or personal information!</Form.Text>
        </Form.Group>
      
        <Form.Group className="mb-3">
          <Form.Control type="number" id="votePoints" onChange={handleChange} placeholder="Input number of votes" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Commit your secret vote
        </Button>
      </Form>
    )
}