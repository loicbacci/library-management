import React, { useEffect, useState } from 'react';
import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import PageLayout from '../common/PageLayout';
import AddButton from '../common/AddButton';
import { addClient, getClientsList, removeClient } from '../firebase/clients';
import ClientsListEntry from './ClientsListEntry';
import AddClientModal from './AddClientModal';
import ViewClientModal from './ViewClientModal';


const Clients = () => {
  //TODO sort clients that have loaned books

  // Toast
  const toast = useToast();

  // Clients
  const [clients, setClients] = useState([] as Client[]);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null as Client | null);

  // Set listener for client list updates
  useEffect(() => {
    getClientsList(setClients);
  }, []);


  const addClientHandler = (name: string, email: string, phone: string, address: string) => {
    setShowAddModal(false);
    addClient(name, email, phone, address)
      .then(() => {
        toast({
          title: "Successfully added client",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Failed to add client",
          description: reason,
          status: "error",
          isClosable: true
        })
      });
  }

  const viewModalClose = () => {
    setShowViewModal(false);
    setSelectedClient(null);
  }


  // Handlers
  const clientClick = (client: Client) => () => {
    setSelectedClient(client);
    setShowViewModal(true);
  }

  const handleDelete = () => {
    if (!selectedClient) return;

    removeClient(selectedClient.id)
      .then(() => {
        toast({
          title: "Delete successful",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Delete failed",
          description: reason,
          status: "error",
          isClosable: true
        })
      })

    viewModalClose();
  }

  return (
    <PageLayout>
      <Heading as="h2">Clients</Heading>

      <Stack>
        {clients.map(client => (
          <ClientsListEntry
            client={client}
            onClick={clientClick(client)}
            key={client.id}
          />
        ))}
      </Stack>

      <AddButton onClick={() => setShowAddModal(true)}>
        <Text>Add client</Text>
      </AddButton>

      <AddClientModal
        shown={showAddModal}
        onClose={() => setShowAddModal(false)}
        addClient={addClientHandler}
      />

      {selectedClient && <ViewClientModal
        shown={showViewModal}
        onClose={viewModalClose}
        client={selectedClient}
        editClient={() => alert("Can't edit yet")}
        handleDelete={handleDelete}
      />}
    </PageLayout>
  )
};

export default Clients;
