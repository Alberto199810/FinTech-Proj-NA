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
              <Nav.Link href="/"><h4 className="linkText">Home</h4></Nav.Link>
              <Nav.Link href="/voterView"><h4 className="linkText">Voting Dashboard</h4></Nav.Link>
              <Nav.Link href="/adminView"><h4 className="linkText">Admin Dashboard</h4></Nav.Link>
              <Nav.Link href="/guestView"><h4 className="linkText">Apply for voting access</h4></Nav.Link>
              <Nav.Link href="/results"><h4 className="linkText">Results</h4></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
};