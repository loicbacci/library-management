import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { FilterStatus } from './bookTypes';


interface BookFilterProps {
  currentFilter: FilterStatus,
  setFilter: (filter: FilterStatus) => void
}

const BookFilter = (props: BookFilterProps) => {
  const { currentFilter, setFilter } = props;

  return (
    <DropdownButton variant="outline-primary" title="Filter" className="px-3">
      <Dropdown.Item
        onClick={() => setFilter(FilterStatus.All)}
        active={currentFilter === FilterStatus.All}
      >
        All
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => setFilter(FilterStatus.Loaned)}
        active={currentFilter === FilterStatus.Loaned}
      >
        Loaned
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => setFilter(FilterStatus.Available)}
        active={currentFilter === FilterStatus.Available}
      >
        Available
      </Dropdown.Item>
    </DropdownButton>
  )
}

export default BookFilter;
