import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel, Heading, HStack, IconButton,
  Input, InputGroup, InputLeftElement, Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay, Spacer,
  Stack, StackDivider, Text
} from '@chakra-ui/react';
import { FiEdit, FiHome, FiMail, FiPhone, FiTrash, FiUser } from 'react-icons/fi';

interface ViewClientModalProps {
  shown: boolean,
  onClose: () => void,
  client: Client,

  editClient: (newClient: Client) => void,

  handleDelete: () => void
}

const ViewClientModal = (props: ViewClientModalProps) => {
  const { shown, onClose, client, editClient, handleDelete } = props;

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const [address, setAddress] = useState(client.address);

  const [editing, setEditing] = useState(false);

  const handleSubmit = () => {
    editClient({
      ...client,
      name, email, phone, address
    })
  }

  const toggleEdit = () => {
    if (editing) {
      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone);
      setAddress(client.address);
    }

    setEditing(!editing);
  }

  return (
    <Modal isOpen={shown} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Heading>{client.name}</Heading>
          </HStack>

        </ModalHeader>

        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiUser />
                </InputLeftElement>

                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                  disabled={!editing}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiMail />
                </InputLeftElement>

                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={!editing}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiPhone />
                </InputLeftElement>

                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  autoComplete="tel"
                  disabled={!editing}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiHome />
                </InputLeftElement>

                <Input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  autoComplete="street-address"
                  disabled={!editing}
                />
              </InputGroup>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <HStack divider={<StackDivider borderColor="gray.200" />} spacing={2}>
              <IconButton
                aria-label="Edit client"
                onClick={toggleEdit}
                icon={<FiEdit/>}
                isActive={editing}
              />

              {editing
                ? <>
                  <HStack>
                    <IconButton
                      colorScheme="red"
                      aria-label="Delete client"
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

export default ViewClientModal;