import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import AddClientModal from './AddClientModal';
import ListGroup from 'react-bootstrap/ListGroup';
import ClientsListEntry from './ClientsListEntry';
import { Alert } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { addClient, getClientsList } from '../firebase/clients';

const ClientsList = () => {
  const [clientsList, setClientsList] = useState([] as Client[]);
  const [showModal, setShowModal] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
 // const [showFail, setShowFail] = useState(false);

  const [alertTimeout, setAlertTimeout] = useState(setTimeout(() => {}, 0));

  useEffect(() => {
    getClientsList(cs => setClientsList(cs));
  }, []);

  const successHandler = () => {
    setShowSuccess(true);
    clearTimeout(alertTimeout);
    setAlertTimeout(setTimeout(() => setShowSuccess(false), 5000));
  }

  const addClientHandler = (client: Client) => {
    addClient(client).then(successHandler)
  }

  return (
    <Container className="p-3">
      <h3>Clients list</h3>

      <div className="py-3">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add client
        </Button>
      </div>

      {showSuccess && (
        <Alert variant="success">
          Success
        </Alert>
      )}

      <ListGroup>
        {clientsList.map((client) => (
          <ClientsListEntry
            client={client}
            deleteSuccess={successHandler}
            deleteFailed={() => console.error("delete failed")}
            key={client.id}
          />
        ))}
      </ListGroup>

      <AddClientModal
        shown={showModal}
        onClose={() => setShowModal(false)}
        addClient={addClientHandler}
      />
    </Container>
  )
};

export default ClientsList;
