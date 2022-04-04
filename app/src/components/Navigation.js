import React from "react"
import {Nav, Navbar, Container} from 'react-bootstrap';

export default function Navigation() {

  return(
      <Navbar bg="light" expand="">
        <Container>
          <Navbar.Brand href="#home"><strong>Voting DApp</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/voterView">Voting Dashboard</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
};