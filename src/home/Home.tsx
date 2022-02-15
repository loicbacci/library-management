import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Center, Container, Flex, Spacer, Stack } from '@chakra-ui/react';

const Home = () => {
  return (
    <Center pt={6}>
      <Stack spacing={6}>
        <Button>
          <Link to="/books">Books</Link>
        </Button>

        <Button>
          <Link to="/clients">Clients</Link>
        </Button>

        <Button>
          <Link to="/loans">Loans</Link>
        </Button>
      </Stack>
    </Center>
  );
}

export default Home;