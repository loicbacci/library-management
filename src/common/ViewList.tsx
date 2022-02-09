import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap';

interface ViewListProps<T> {
  title: string,
  addText: string,
  list: Array<T>,
  entryBuilder: (elem: T) => Element
}

function ViewList<T>(props: ViewListProps<T>) {
  const { title, addText, list, entryBuilder } = props;

  const [showAddModal, setShowAddModal] = useState(false);

  //TODO add success alert

  return (
    <Container className="p-3">
      <h3>{title}</h3>

      <div className="py-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          {addText}
        </Button>
      </div>

      <ListGroup>
        {list.map(entryBuilder)}
      </ListGroup>

    </Container>
  )
}

export default ViewList;
