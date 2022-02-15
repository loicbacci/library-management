import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { CgPassword } from 'react-icons/cg';

interface PasswordInputProps {
  password: string,
  setPassword: (password: string) => void,
}

const PasswordInput = (props: PasswordInputProps) => {
  const { password, setPassword } = props;

  return (
    <FormControl>
      <FormLabel htmlFor="password">Password</FormLabel>

      <InputGroup id="password">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={<CgPassword />}
        />

        <Input
          pr="4.5rem"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;