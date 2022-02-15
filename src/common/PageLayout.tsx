import React from 'react';
import { Container, Stack } from '@chakra-ui/react';

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;
 
  return (
    <Container>
      <Stack spacing={6} pt={6}>
        {children}
      </Stack>
    </Container>
  );
};

export default PageLayout;
