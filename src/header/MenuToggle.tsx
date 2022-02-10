import React from 'react';
import { Box } from '@chakra-ui/react';

import { FiMenu, FiX } from 'react-icons/fi';


interface MenuToggleProps {
 toggle: () => void,
 isOpen: boolean
}

const MenuToggle = (props: MenuToggleProps) => {
 const { toggle, isOpen } = props;

 return (
  <Box display={{ base: "block", md: "none" }} onClick={toggle}>
   {isOpen ? <FiX /> : <FiMenu />}
  </Box>
 );
};

export default MenuToggle;