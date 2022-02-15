import React, { useEffect, useState } from 'react';
import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import PageLayout from '../common/PageLayout';
import AddButton from '../common/AddButton';
import { addClient, editClient, getClientsList, removeClient } from '../firebase/clients';
import ClientsListEntry from './ClientsListEntry';
import AddClientModal from './AddClientModal';
import ViewClientModal from './ViewClientModal';
import { useNavigate, useParams } from 'react-router-dom';


const Clients = () => {
  // React Router hooks
  const params = useParams();
  const navigate = useNavigate();

  //TODO filter clients that have loaned books

  // Toast
  const toast = useToast();

  // Clients
  const [clients, setClients] = useState([] as Client[]);
  const [initialized, setInitialized] = useState(false);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null as Client | null);

  // Selected book handler
  useEffect(() => {
    if (params.clientId) {
      const client = clients.find(c => c.id === params.clientId)
      if (client) {
        setSelectedClient(client);
        setShowViewModal(true);
      } else if (initialized) {
        toast({
          title: "Failed to find client",
          status: "error",
          isClosable: true
        });
        navigate("/clients");
      }
    }
  }, [params, clients, navigate, initialized, toast]);

  // Set listener for client list updates
  useEffect(() => {
    getClientsList(clients => {
      setClients(clients);
      setInitialized(true);
    });
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
    navigate("/clients");
  }


  // Handlers
  const clientClick = (client: Client) => () => {
    navigate(`/clients/${client.id}`);
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

  const handleEdit = (newClient: Client) => {
    editClient(newClient)
      .then(() => {
        toast({
          title: "Edit successful",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Edit failed",
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
        editClient={handleEdit}
        handleDelete={handleDelete}
      />}
    </PageLayout>
  )
};

export default Clients;
