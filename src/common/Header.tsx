import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { signOut } from '../firebase/utils';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" variant="light" expand="sm">
      <Container>
        <Navbar.Brand href="#" onClick={() => navigate("/")}>
          Library Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Item>
              <Nav.Link eventKey="l1" onClick={() => navigate("/books")}>Books</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="l2" onClick={() => navigate("/clients")}>Clients</Nav.Link>
            </Nav.Item>
          </Nav>

          <Nav>
            <Button variant="outline-primary" onClick={signOut}>Log Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;