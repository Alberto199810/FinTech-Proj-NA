import React from 'react'

export default function CommitVoteForm({ drizzle, drizzleState }) {
    const utils = drizzle.web3.utils

    const stateApp = {
        vote: "",
        votePoints:0
    };

    const handleChange = (e) => {
        stateApp[e.target.id] = e.target.value;
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const convertedVote = utils.soliditySha3(stateApp.vote)

        return drizzle.contracts.CommitRevealElections
            .methods.commitVote
            .cacheSend(convertedVote, stateApp.votePoints, {value: 1000000000000000000})
    }

    return (
            <div className="voteCommit--group">
                <form onSubmit={handleSubmit}>
                    <input type="string" className="form-control" id="vote" onChange={handleChange} placeholder="vote" />
                    <input type="number" className="form-control" id="votePoints" onChange={handleChange} placeholder="votePoints" />
                    <button className="btn btn-primary">Commit Vote!</button>
                </form>
            </div>
    )
}