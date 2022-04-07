import React from 'react'
import { toast } from 'react-toastify'
import { Button, Form } from 'react-bootstrap';
import { newContextComponents } from "@drizzle/react-components"

const {ContractData} = newContextComponents;

// showApplierForRights (giveRightsToAddresses (accepts a list: make a list with checkboxes and send that to the final call))
export default ({ drizzle, drizzleState}) => {
    const [applied, setApplied] = React.useState({});
    const [approved, setApproved] = React.useState([]);

    React.useEffect(() => {
        async function getData() {
            const apps = await drizzle.contracts.CommitRevealElections.methods.showApplierForRights().call()
            apps.map((app) => {
                setApplied((prevState) => {
                    return {
                        ...prevState,
                        [app]: false
                    }
                })
            })   
        }

        getData()
    }, [])
    
    const handleChange = (e) => {
        setApplied((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.checked
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const appList = Object.keys(applied)
        for (let i = 0; i < appList.length; i++) {
            if (applied[appList[i]] === true) {
                setApproved(approved.push(appList[i]))
            }
        }


        drizzle.contracts.CommitRevealElections
            .methods.giveRightsToAddresses(approved)
            .send()
            .then(res => toast.success("Successfully gave rights to the selected accounts!", { position: toast.POSITION.TOP_RIGHT }))
            .catch(err => {
                const regExp = /"message":(".*?")/ig
                const error = regExp.exec(err.message)[1]

                toast.error(error, { position: toast.POSITION.TOP_RIGHT })
            })
    }

    return (
    <div>
        <h4>List of accounts applying for voting right</h4> 
        <p>Below you can find a list of all address that have currently subitted
            a request for votin rights, click the checkbox next to the name of those
            you wish to approve and then click the <strong>Approve Accounts</strong> button!</p>
        <p>Besides the Ballot summary at the top of the page you can find current information on the running
            election at the bottom that might be useful when determining who should be approved to vote!</p>   
    <div className='listOfApps'>
    <Form className="approval-form" onSubmit={handleSubmit}>
        {Object.keys(applied).map((address) => (
            <Form.Check 
                key={address}
                type= "checkbox"
                id={address}
                label={address}
                onChange={handleChange}
            />

        ))}
        <br />
        <Button variant="primary" type="submit">
          Approve Accounts
        </Button>
    </Form>
    </div>
    </div>
    )
}

   