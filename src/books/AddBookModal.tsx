import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

interface AddBookModalProps {
  shown: boolean,
  onClose: () => void,
  addBook: (title: string, author: string) => void,

  authors: string[]
}

const AddBookModal = (props: AddBookModalProps) => {
  const { shown, onClose, addBook, authors } = props;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = () => {
    addBook(title, author);
    setTitle("");
    setAuthor("");
  }

  return (
    <Modal isOpen={shown} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a book</ModalHeader>

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

              <InputGroup>
                <Input
                  id="author"
                  pr="4.5rem"
                  type="text"
                  placeholder="Enter author"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                />

                <InputRightElement>
                  <Menu>
                    <MenuButton
                      h="1.75rem"
                      as={IconButton}
                      aria-label='Options'
                      icon={<FiChevronDown />}
                      variant='ghost'
                    />
                    <MenuList>
                      {authors.map((au, i) => (
                        <MenuItem key={i} onClick={() => setAuthor(au)}>
                          {au}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </InputRightElement>
              </InputGroup>
            </FormControl>

          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>

            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleSubmit}>Save</Button>
          </ButtonGroup>

        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddBookModal;