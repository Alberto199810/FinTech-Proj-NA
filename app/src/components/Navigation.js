import React from "react"
import {Nav, Navbar, Container} from 'react-bootstrap';

export default function Navigation() {

  return(
      <Navbar fluid="true" className="navbar" bg="light" expand="">
        <Container>
          <Navbar.Brand href="/"><strong>Voting DApp</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/voterView">Voting Dashboard</Nav.Link>
              <Nav.Link href="/results">Results</Nav.Link>
              <Nav.Link href="/guestView">Apply for voting access</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
};