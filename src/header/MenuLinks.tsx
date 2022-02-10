import React from 'react';
import { Button, Spacer, Stack } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import { signOut } from '../firebase/utils';

interface MenuLinksProps {
  isOpen: boolean
}

const MenuLinks = (props: MenuLinksProps) => {
  const { isOpen } = props;

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      display={{ base: isOpen ? "block" : "none", md: "flex" }}
      width={{ base: "full", md: "auto" }}
      alignItems="center"
      flexGrow={1}
      mt={{ base: 4, md: 0 }}
    >
      <MenuItem to="/books">Books</MenuItem>
      <MenuItem to="/clients">Clients</MenuItem>

      <Spacer/>
      <Button
        variant="outline"
        _hover={{ bg: "teal.700", borderColor: "teal.700" }}
        onClick={signOut}
      >
        Log Out
      </Button>
    </Stack>

  );
};

export default MenuLinks;