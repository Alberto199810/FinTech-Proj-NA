import React from 'react'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap';

export default ({ drizzle, drizzleState }) => {
    const utils = drizzle.web3.utils

    const [vote, setVote] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleChangeVote = (e) => {
      setVote(e.target.value)
    }

    const handleChangePass = (e) => {
      setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const concVote = vote + '-' + password
        const convertedVote = utils.soliditySha3(vote + '-' + password)        

        drizzle.contracts.CommitRevealElections
            .methods.revealVote(concVote, convertedVote)
            .send()
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
          <Form.Control type="string" id="vote" onChange={handleChangeVote} placeholder="Input the candidate you voted for" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="password" id="password" onChange={handleChangePass} placeholder="Password" />
          <Form.Text>Friendly reminder - your password is safe!</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Reveal your vote
        </Button>
      </Form>
    )
}