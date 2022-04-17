import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import Navigation from "./Navigation"
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify'


const { ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, stage }) => {    

    const handleSubmit = (e) => {
        e.preventDefault()      

        drizzle.contracts.CommitRevealElections
            .methods.applyForRights()
            .send()
            .then(res => {
                toast.success("Successfully applied for voting rights!", { position: toast.POSITION.TOP_RIGHT })
            })
            .catch(err => {
                const regExp = /"message":(".*?")/ig
                const error = regExp.exec(err.message)[1]

                toast.error(error, { position: toast.POSITION.TOP_RIGHT })
            })
    }

    return (
        <div>
        <Navigation />
        <div className="App">
            {
            stage === "Vote Over" || stage === "Reveal" ?
            <h4>This ballot is closed for further voting!</h4>
            :
            stage === "Loading" ?
            <p>Loading...</p>
            :
            <div>
            <h1>{"Welcome to the "}
            {<ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="CommitRevealElections"
                method="getTitle"
            />}</h1>
            <p>To participate in this ellection you need to request voting rights from the Admin
                before the end of the Commitment Phase, please do so using the button below!</p>
            <Form className="commit-form" onSubmit={handleSubmit}>
                <Button variant="primary" type="submit">
                Apply for voting rights!
                </Button>
            </Form>
            </div>
            }
        </div>
        </div>
    )
};
