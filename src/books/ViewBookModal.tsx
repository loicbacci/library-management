import React, { useState } from 'react';
import { removeBook } from '../firebase/books';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel, Heading, IconButton,
  Input, Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack, Text
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';

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
    <Modal isOpen={shown} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading>{title}</Heading>
          <Text>{author}</Text>
        </ModalHeader>

        <ModalBody>
          <Stack spacing={4}>

            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                pr="4.5rem"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="author">Author</FormLabel>
              <Input
                id="author"
                pr="4.5rem"
                type="text"
                placeholder="Enter author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </FormControl>

          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <IconButton
              colorScheme="red"
              aria-label="Delete book"
              icon={<FiTrash />}
              onClick={handleDelete}
            />
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleSubmit}>Edit</Button>
          </ButtonGroup>

        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  /*

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

   */
}

export default ViewBookModal;