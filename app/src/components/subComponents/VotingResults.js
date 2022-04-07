import React from "react"
import { Table } from "react-bootstrap";

export default ({ drizzle, drizzleState, winners }) => {
    winners = ["Obama", "Biden"]
    return (
        <div className="table--div">
            <h4>Voting Over and results are revealed!</h4>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Ballot winners in descending order</th>
                    </tr>
                </thead>
                <tbody>
                    {winners.map(winner => <tr key={winner}><th>{winners.indexOf(winner) + 1}</th><th>{winner}</th></tr>)}  
                </tbody>
            </Table>
            {/* <h4>List of the ballot winners in order of most votes received:</h4>
            <ol>
                {winners.map(winner => <li key={winner}>{winner}</li>)}
            </ol> */}
        </div>
    )
}