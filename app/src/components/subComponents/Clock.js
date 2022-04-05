import React from 'react'

export default function Clock({ timeLeft }) {
    function createClock(timeLeft) {
        const timerComponents = []

        Object.keys(timeLeft).forEach((interval) => {
            if (!timeLeft[interval]) {
                return;
            }
        
            timerComponents.push(
                <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
                </span>
            );
        });

        return timerComponents
    }

    const proposeClock = createClock(timeLeft.timeProposal)
    const commitClock = createClock(timeLeft.timeCommitment)
    const revealClock = createClock(timeLeft.timeReveal)

    return (
        <div className='clocks'>
        {proposeClock.length ? <div className='clock'><span className='clock--title'>Time left for proposal: </span><span className='clock--countdown'>{proposeClock}</span></div> 
        : <div className='clock'><span className='clock--title'>Time left for proposal: </span><span className="clock--countdown">The stage is over!</span></div>}
        <br />
        {commitClock.length ? <div className='clock'><span className='clock--title'>Time left for commitment: </span><span className='clock--countdown'>{commitClock}</span></div> 
        : <div className='clock'><span className='clock--title'>Time left for commitment: </span><span className="clock--countdown">The stage is over!</span></div>}
        <br />
        {revealClock.length ? <div className='clock'><span className='clock--title'>Time left for reveal: </span><span className='clock--countdown'>{revealClock}</span></div> 
        : <div className='clock'><span className='clock--title'>Time left for reveal: </span><span className="clock--countdown">The stage is over!</span></div>}
        </div>
    );
}