import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { SortStatus } from './bookTypes';


interface BookSortProps {
  currentSort: SortStatus,
  setSort: (sortStatus: SortStatus) => void
}

const BookSort = (props: BookSortProps) => {
  const { currentSort, setSort } = props;

  return (
    <DropdownButton variant="outline-primary" title="Sort">
      <Dropdown.Item
        onClick={() => setSort(SortStatus.Title)}
        active={currentSort === SortStatus.Title}
      >
        Title (default)
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => setSort(SortStatus.Author)}
        active={currentSort === SortStatus.Author}
      >
        Author
      </Dropdown.Item>
    </DropdownButton>
  )
}

export default BookSort;
