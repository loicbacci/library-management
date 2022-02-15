import React from 'react';
import { Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { FilterStatus, nameToFilter, nameToSort, SortStatus } from './bookTypes';

interface BooksOptionsProps {
  sort: SortStatus,
  setSort: (sort: SortStatus) => void,

  filter: FilterStatus,
  setFilter: (filter: FilterStatus) => void
}

const BooksOptions = (props: BooksOptionsProps) => {
  const { sort, setSort, filter, setFilter } = props;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FiChevronDown />}>
        Options
      </MenuButton>

      <MenuList>
        <MenuOptionGroup
          title="Filter"
          type="radio"
          value={filter}
          onChange={s => setFilter(nameToFilter(s as string))}
        >
          <MenuItemOption value="ALL">All</MenuItemOption>
          <MenuItemOption value="AVAILABLE">Available</MenuItemOption>
          <MenuItemOption value="LOANED">Loaned</MenuItemOption>
        </MenuOptionGroup>

        <MenuOptionGroup
          title="Order"
          type="radio"
          value={sort}
          onChange={s => setSort(nameToSort(s as string))}
        >
          <MenuItemOption value="TITLE">Title</MenuItemOption>
          <MenuItemOption value="AUTHOR">Author</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default BooksOptions;