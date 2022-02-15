import React from 'react';
import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import ListEntry from '../common/ListEntry';

interface BookListEntryProps {
  book: Book
  onClick: () => void,
}

const BookListEntry = (props: BookListEntryProps) => {
  const { book, onClick } = props;
  const { title, author } = book;

  const bgColor = book.loanId ? "orange.200" : "transparent";

  return (
    <ListEntry onClick={onClick} bgColor={bgColor}>
      <Wrap>
        <WrapItem>
          <Text fontWeight="semibold">{title}</Text>
        </WrapItem>
        <WrapItem>
          <Text> - {author}</Text>
        </WrapItem>
      </Wrap>
    </ListEntry>
  )

}

export default BookListEntry;