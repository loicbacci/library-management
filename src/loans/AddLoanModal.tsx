import React from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

interface AddLoanModalProps {
  shown: boolean,
  onClose: () => void,
  addLoan: (bookId: string, clientId: string, date: Date) => void,
}

const AddLoanModal = (props: AddLoanModalProps) => {
  const { shown, onClose, addLoan } = props;


  const handleSubmit = () => {
    console.log("submit")
  }

  const handleClose = () => {
    onClose();
    console.log("close");
  }

  return (
    <Modal isOpen={shown} onClose={handleClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a loan</ModalHeader>

        <ModalBody>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>

            <Button onClick={handleClose}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleSubmit}>Save</Button>
          </ButtonGroup>

        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddLoanModal;