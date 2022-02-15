import React from 'react';
import { Button } from '@chakra-ui/react';

interface AddButtonProps {
  onClick: () => void,
  children: React.ReactNode
}

const AddButton = (props: AddButtonProps) => {
  const { onClick, children } = props;

  return (
    <Button
      colorScheme="teal"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AddButton;