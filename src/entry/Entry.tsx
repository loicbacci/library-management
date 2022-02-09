import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/utils';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

interface EntryProps {
  logIn: () => void
}

const Entry = ({ logIn }: EntryProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(logIn);
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // Already logged in
        logIn();
      }
    })
  }, [logIn]);

  return (
    <Container className="mt-3">
      <h1>Library Management</h1>

      <Card>
        <Card.Body>
          <Card.Title>Sign in</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                            onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </Container>
  );
}

export default Entry;
