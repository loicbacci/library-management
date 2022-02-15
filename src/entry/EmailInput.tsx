import React from 'react';
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiMail } from 'react-icons/fi';

interface EmailInputProps {
  email: string,
  setEmail: (email: string) => void
}

const EmailInput = (props: EmailInputProps) => {
  const { email, setEmail } = props;

  return (
    <FormControl>
      <FormLabel htmlFor="email">Email adress</FormLabel>

      <InputGroup id="email">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={<FiMail />}
        />

        <Input
          pr="4.5rem"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </InputGroup>
    </FormControl>
  );
};

export default EmailInput;