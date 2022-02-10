import React from 'react';
import { Flex } from '@chakra-ui/react';

interface HeaderContainerProps {
  children: React.ReactNode,
  center?: boolean
}

const HeaderContainer = (props: HeaderContainerProps) => {
  const { children, center } = props;

  return (
    <Flex
      as="nav"
      align="center"
      justify={center ? "center" : 'space-between'}
      wrap="wrap"
      py={3}
      px={6}
      bg="teal.500"
      color="white"
      m={{ base: 0, md: 2 }}
      borderRadius={{ base: 0, md: "lg" }}
    >
      {children}
    </Flex>
  );
};

export default HeaderContainer;