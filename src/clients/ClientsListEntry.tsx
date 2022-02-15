import React from 'react';
import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import ListEntry from '../common/ListEntry';

interface ClientsListEntryProps {
  client: Client
  onClick: () => void,
}

const ClientsListEntry = (props: ClientsListEntryProps) => {
  const { client, onClick } = props;

  return (
    <ListEntry onClick={onClick}>
      <Text fontWeight="semibold">{client.name}</Text>
    </ListEntry>
  )
}

export default ClientsListEntry;