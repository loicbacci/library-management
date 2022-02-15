import React, { useEffect, useState } from 'react';
import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import ListEntry from '../common/ListEntry';
import { getTitle } from '../firebase/books';
import { getName } from '../firebase/clients';

interface LoansListEntryProps {
  loan: Loan,
  onClick: () => void,
}

const LoansListEntry = (props: LoansListEntryProps) => {
  const { loan, onClick } = props;

  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getTitle(loan.bookId).then(setTitle);
    getName(loan.clientId).then(setName);

  }, [loan]);

  return (
    <ListEntry onClick={onClick}>
      <Wrap>
        <WrapItem>
          <Text fontWeight="semibold">{title}</Text>
        </WrapItem>
        <WrapItem>
          <Text> - {name}</Text>
        </WrapItem>
      </Wrap>
    </ListEntry>
  )
}

export default LoansListEntry;