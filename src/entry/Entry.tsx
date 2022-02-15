import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/utils';
import { Box, Button, Center, Container, Heading, Stack } from '@chakra-ui/react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

interface EntryProps {
  logIn: () => void
}

const Entry = ({ logIn }: EntryProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(logIn);
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // Already logged in
        logIn();
      }
    })
  }, [logIn]);

  return (
    <Container>
      <Center>
        <Box
          borderWidth='1px'
          borderRadius='lg'
          p={6}
          mt={4}
        >
          <Stack spacing={4}>
            <Heading>Sign in</Heading>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <EmailInput email={email} setEmail={setEmail} />

                <PasswordInput
                  password={password}
                  setPassword={setPassword}
                />

                <Button type="submit" colorScheme="teal" variant="outline" size="md">
                  Submit
                </Button>
              </Stack>

            </form>
          </Stack>
        </Box>
      </Center>
    </Container>
  );
}

export default Entry;
