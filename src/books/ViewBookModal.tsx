import React, { useState } from 'react';
import { removeBook } from '../firebase/books';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel, Heading, HStack, IconButton,
  Input, Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack, StackDivider, Text
} from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';

interface ViewBookModalProps {
  shown: boolean,
  onClose: () => void,
  book: Book,

  editBook: (newBook: Book) => void,

  handleDelete: () => void
}

const ViewBookModal = (props: ViewBookModalProps) => {
  const { shown, onClose, book, editBook, handleDelete } = props;

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const [editing, setEditing] = useState(false);

  const handleSubmit = () => {
    editBook({
      ...book,
      title, author
    })
  }

  const toggleEdit = () => {
    if (editing) {
      setTitle(book.title);
      setAuthor(book.author);
    }

    setEditing(!editing);
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
                disabled={!editing}
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
                disabled={!editing}
              />
            </FormControl>

          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <HStack divider={<StackDivider borderColor="gray.200" />} spacing={2}>
              <IconButton
                aria-label="Edit book"
                onClick={toggleEdit}
                icon={<FiEdit/>}
                isActive={editing}
              />

              {editing
                ? <>
                  <HStack>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete book"
                      icon={<FiTrash />}
                      onClick={handleDelete}
                    />

                    <Button colorScheme="teal" onClick={handleSubmit}>
                      Edit
                    </Button>
                  </HStack>
                </>
                : <Button onClick={onClose}>Close</Button>
              }
            </HStack>
          </ButtonGroup>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ViewBookModal;