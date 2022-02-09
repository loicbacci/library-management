import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface AddBookModalProps {
  shown: boolean,
  onClose: () => void,
  addBook: (title: string, author: string) => void
}

const AddBookModal = (props: AddBookModalProps) => {
  const { shown, onClose, addBook } = props;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = () => {
    addBook(title, author);
  }

  return (
    <Modal show={shown} centered>
      <Modal.Header>
        <Modal.Title>Add a book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title"
                   onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter author"
                   onChange={e => setAuthor(e.target.value)}
            />
          </Form.Group>
        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddBookModal;