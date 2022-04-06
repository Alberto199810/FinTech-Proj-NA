import React from "react"
import Navigation from "./Navigation"
import { Button, Card, Nav } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import HomeCardBody from "./subComponents/HomeCardBody";

export default function Home({ drizzle, drizzleState }) {
  const { hash } = useLocation();

  return(
    <div>
      <Navigation />
        <div className="App">
          <h2>Welcome to the decentralized voting system of the future!</h2>
          <h4>Currently logged in with account number:</h4>
          <p>{drizzleState.accounts[0]}</p>
          <div className="section">
          <h4>The rules of the game!</h4>
          <p>
            Your role in this ellection is that of either an <strong>Admin, Voter </strong>
            or <strong>Guest</strong>, depending on that acceess the relevant dashboard
          </p>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#voterInfo">
                <Nav.Item>
                  <Nav.Link href="#voterInfo">Voters</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#link">Guests</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#link2">Admin</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <HomeCardBody hash={hash} />
          </Card>
          </div>
          
        </div>
    </div>
  )
};
