import React from "react"
import { newContextComponents } from "@drizzle/react-components"
import { Table } from "react-bootstrap";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'
// import 'mdbreact/dist/css/mdb.css';

const { ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState, winners }) => {
    const sampleData = {
        labels: ["Sunday", "Monday", "Tuesday",
          "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [
          {
            label: "Hours Studied in Geeksforgeeks",
            data: [2, 5, 6, 7, 3, 3, 4],
            backgroundColor: "#02b844",
            borderWidth: 1,
            borderColor: "#000000",
          }
        ]
      }

    const [votesByCand, setVotesByCandidate] = React.useState({})
    const [chartData, setChartData] =React.useState(sampleData)

    React.useEffect(() => {
        async function getData() {
            const candidates = await drizzle.contracts.CommitRevealElections.methods.showCandidates().call()
            for (let i = 0; i < candidates.length; i++) {
                const votes = await drizzle.contracts.CommitRevealElections.methods.votesForACandidate(candidates[i]).call()
                setVotesByCandidate((prevState) => {
                    // console.log(prevState)
                    return {
                        ...prevState,
                        [candidates[i]]: votes
                    }
                })
            }
            
        }

        getData()

        const data = {
            labels: Object.keys(votesByCand),
            datasets: [
              {
                label: "Current ballot standings",
                data: Object.values(votesByCand),
                backgroundColor: "#0275d8",
                borderWidth: 1,
                borderColor: "#000000",
              }
            ]
          }

        setChartData(data)
    }, [])



    return (
        <div className="table--div">
            <h4>Here are some statistics about the current ballot</h4>
            <br />
            <Table className="table--stats" striped bordered hover >
                <thead>
                <tr>
                    <th className="table--th">Total Votes Cast</th>
                    <th className="table--th">Total Votes Revealed</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th className="table--th">
                    <ContractData 
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="CommitRevealElections"
                        method="numberOfVotesCast"
                    />
                    </th>
                    <th className="table--th">
                    <ContractData 
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="CommitRevealElections"
                        method="numberOfVotesRevealed"
                    />
                    </th>
                </tr>
                <tr>
                    <th colSpan={2}>
                    <MDBContainer>
                        <Bar data={chartData}
                            style={{ maxHeight: '600px' }}
                        />
                    </MDBContainer>
                    </th>
                </tr>
                </tbody>
            </Table>
            <br />
        </div>
    )
}