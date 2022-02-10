import React from 'react';
import { Button } from '@chakra-ui/react';

interface AddBookButtonProps {
  onClick: () => void,
}

const AddBookButton = (props: AddBookButtonProps) => {
  const { onClick } = props;

  return (
    <Button
      colorScheme="teal"
      onClick={onClick}
    >
      Add book
    </Button>
  );
};

export default AddBookButton;