import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface BookListEntryProps {
  book: Book

  onClick: () => void,
  isActive: boolean,

  noAuthor?: boolean
}

const BookListEntry = (props: BookListEntryProps) => {
  const { book, onClick, isActive, noAuthor } = props;
  const { title, author } = book;

  const variant = book.loaned ? "warning" : "";

  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-start"
      onClick={onClick}
      action
      active={isActive}
      variant={variant}
    >
      <div className="ms-2 me-auto">
        <span className={!noAuthor ? 'fw-bold' : ""}>{title}</span>
        {!noAuthor && ` - ${author}`}
      </div>

      <div className="my-auto">
        <FontAwesomeIcon icon={faAngleRight}/>
      </div>
    </ListGroup.Item>
  );
}

export default BookListEntry;