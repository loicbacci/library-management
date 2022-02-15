import React from 'react';
import { Flex, Heading, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <Flex align="center" mr={5}>
      <NavLink to="/">
        <Heading as="h1" size="md">
          Library Management
        </Heading>
      </NavLink>
    </Flex>
  )
}

export default Logo;
