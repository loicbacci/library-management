import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="p-3">
      <Row className="pt-3 align-items-center h-100">
        <Col className="d-flex justify-content-center">
          <Link to="/books" className="btn btn-primary">Books</Link>
        </Col>

        <Col className="d-flex justify-content-center">
          <Link to="/clients" className="btn btn-primary">Clients</Link>
        </Col>
      </Row>

    </Container>
  );
}

export default Home;