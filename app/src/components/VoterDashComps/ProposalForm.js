import React from 'react'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap';

export default function ProposalForm({ drizzle, drizzleState }) {

    const [stateApp, setStateApp] = React.useState({
                        candidateProposal: ""
                      })

    const handleChange = (e) => {
      setStateApp({
        [e.target.id] : e.target.value
      })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        drizzle.contracts.CommitRevealElections
            .methods.setCandidates(stateApp.candidateProposal)
            .send()
            .then(res => console.log(res))
            .catch(err => {
                const regExp = /"message":(".*?")/ig
                const error = regExp.exec(err.message)[1]

                toast.error(error, { position: toast.POSITION.TOP_RIGHT })
            })
    }

    return (
        <Form className="propose-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control type="string" id="candidateProposal" onChange={handleChange} placeholder="Input Candidate proposal" />
          <Form.Text>Remeber that only one proposal per voter is allowed!</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Propose candidate
        </Button>
      </Form>
    )
}