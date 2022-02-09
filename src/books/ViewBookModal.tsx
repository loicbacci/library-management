import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { removeBook } from '../firebase/books';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface ViewBookModalProps {
  shown: boolean,
  onClose: () => void,
  book: Book,

  editBook: (newBook: Book) => void,

  deleteSuccess: () => void,
  deleteFailed: (reason: any) => void,
}

const ViewBookModal = (props: ViewBookModalProps) => {
  const { shown, onClose, book, editBook, deleteSuccess, deleteFailed } = props;

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleSubmit = () => {
    editBook({
      ...book,
      title, author
    })
  }

  const handleDelete = () => {
    removeBook(book.id)
      .then(deleteSuccess)
      .catch(deleteFailed)
  }

  return (
    <Modal show={shown} centered>
      <Modal.Header>
        <Modal.Title>{book.title}</Modal.Title>
        {book.author}
      </Modal.Header>

      <Modal.Body>

        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={book.title}
                          onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" value={book.author}
                          onChange={e => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Loaned?"
            checked={book.loaned}
            disabled
          />

          {book.loaned && (
            <Form.Group className="mb-3" controlId="formLoanId">
              <Form.Label>Loan ID</Form.Label>
              <Form.Control type="text" value={book.loanId}
                            disabled
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewBookModal;