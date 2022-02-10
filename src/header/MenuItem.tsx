import React from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

interface MenuItemProps {
  children: React.ReactNode,
  isLast?: boolean,
  to: string
}

const MenuItem = (props: MenuItemProps) => {
  const { children, isLast, to } = props;

  return (
    <NavLink to={to}>
      <Text display="block">
        {children}
      </Text>
    </NavLink>
  );
};

export default MenuItem;