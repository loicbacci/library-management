import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface AddModalProps<T> {
  shown: boolean,
  onClose: () => void
  addHandler: (elem: T) => void,

  textFields: Field[],
  booleanFields: Field[]
}

function AddModal<T>(props: AddModalProps<T>) {
  const { shown, onClose, addHandler, textFields } = props;

  const [obj, setObj] = useState({ });

  const handleSubmit = () => {
    addHandler(obj as T);
  }

  return (
    <Modal show={shown} centered>
      <Modal.Header>
        <Modal.Title>Add a book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {textFields.map(field => (
          <Form.Group className="mb-3">
            <Form.Label>{field.displayName}</Form.Label>
            <Form.Control type="text" placeholder={field.placeholder ? field.placeholder : ""}
                   onChange={e => setObj({
                     ...obj,
                     [field.fieldName]: e.target.value
                   })}
            />
          </Form.Group>
        ))}

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
  )
}

export default AddModal;
