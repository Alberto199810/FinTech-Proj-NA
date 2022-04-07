import React from "react"
import { Form, Button } from "react-bootstrap"
import { toast } from "react-toastify"

export default ({ drizzle, drizzleState }) => {
    function handleSubmit(e) {
        e.preventDefault()

        drizzle.contracts.CommitRevealElections
            .methods.getWinners()
            .send()
            .then(res => console.log(res))
            .catch(err => {
                const regExp = /"message":(".*?")/ig
                const error = regExp.exec(err.message)[1]

                toast.error(error, { position: toast.POSITION.TOP_RIGHT })
            })
    }

    return (
        <div className="vote--end">
        <h4>The reveal period is over, it's time to see who won!</h4>
        <Form className="commit-form" onSubmit={handleSubmit}>
            <Button variant="primary" type="submit">
            Click me to <strong>reveal</strong> the winners
            </Button>
        </Form>
        </div>
    )
}