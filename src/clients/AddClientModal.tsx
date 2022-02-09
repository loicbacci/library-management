import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface AddClientModalProps {
  shown: boolean,
  onClose: () => void,
  addClient: (client: Client) => void
}

const AddClientModal = (props: AddClientModalProps) => {
  const { shown, onClose, addClient } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    addClient({ name, email, phone, address, id: "" });
    onClose();
  }

  return (
    <Modal show={shown} centered>
      <Modal.Header>
        <Modal.Title>Add a client</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control"
                 onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="text" className="form-control"
                 onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control"
                 onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input type="text" className="form-control"
                 onChange={e => setAddress(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddClientModal;
