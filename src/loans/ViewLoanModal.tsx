import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup, Grid, GridItem,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Stack,
  StackDivider,
  Text
} from '@chakra-ui/react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { getTitle } from '../firebase/books';
import { getName } from '../firebase/clients';
import { Link } from 'react-router-dom';

interface ViewLoanModalProps {
  shown: boolean,
  onClose: () => void,
  loan: Loan,

  editLoan: (newLoan: Loan) => void,

  handleDelete: () => void
}

const ViewLoanModal = (props: ViewLoanModalProps) => {
  const { shown, onClose, loan, editLoan, handleDelete } = props;

  const [bookId, setBookId] = useState(loan.bookId);
  const [clientId, setClientId] = useState(loan.clientId);
  const [date, setDate] = useState(loan.date);
  const [returned, setReturned] = useState(loan.returned);

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getTitle(loan.bookId).then(setTitle);
    getName(loan.clientId).then(setName);

  }, [loan]);

  const [editing, setEditing] = useState(false);

  const handleSubmit = () => {
    editLoan({
      ...loan,
      bookId, clientId, date, returned
    })
  }

  const toggleEdit = () => {
    if (editing) {
      setBookId(loan.bookId);
      setClientId(loan.clientId);
      setDate(loan.date);
      setReturned(loan.returned);
    }

    setEditing(!editing);
  }

  return (
    <Modal isOpen={shown} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Heading>{title}</Heading>
            <Text>{name}</Text>
          </HStack>

        </ModalHeader>

        <ModalBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            <GridItem>
              <Text>Book:</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Button>
                <Link to={`/books/${loan.bookId}`}>{title}</Link>
              </Button>
            </GridItem>

            <GridItem>
              <Text>Loaned by:</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Button>
                <Link to={`/clients/${loan.clientId}`}>{name}</Link>
              </Button>
            </GridItem>

            <GridItem colSpan={4}>
              <Text>{returned ? "Returned" : "Not returned"}</Text>
            </GridItem>
          </Grid>


        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <HStack divider={<StackDivider borderColor="gray.200" />} spacing={2}>
              <IconButton
                aria-label="Edit loan"
                onClick={toggleEdit}
                icon={<FiEdit/>}
                isActive={editing}
              />

              {editing
                ? <>
                  <HStack>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete loan"
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

export default ViewLoanModal;