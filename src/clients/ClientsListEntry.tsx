import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeClient } from '../firebase/clients';

interface ClientsListEntryProps {
  client: Client,

  deleteSuccess: () => void,
  deleteFailed: () => void
}

const ClientsListEntry = (props: ClientsListEntryProps) => {
  const { client, deleteSuccess, deleteFailed } = props;

  const handleRemove = () => {
    removeClient(client.id)
      .then(deleteSuccess)
      .catch(deleteFailed)
  }

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{client.name}</div>
        {client.email}
      </div>

      <Button variant="danger" onClick={handleRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </ListGroup.Item>
  );
}

export default ClientsListEntry;
