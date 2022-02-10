import React from 'react';
import { HStack, LinkBox, LinkOverlay, Spacer, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';

interface BookListEntryProps {
  book: Book
  onClick: () => void,
}

const BookListEntry = (props: BookListEntryProps) => {
  const { book, onClick } = props;
  const { title, author } = book;

  const bgColor = book.loaned ? "orange.200" : "transparent";

  return (
    <LinkBox>
      <LinkOverlay href="#" onClick={onClick}>
        <HStack
          borderWidth="1px"
          borderRadius="md"
          px={3}
          py={2}
          bg={bgColor}
        >
          <Wrap>
            <WrapItem>
              <Text fontWeight="semibold">{title}</Text>
            </WrapItem>
            <WrapItem>
              <Text> - {author}</Text>
            </WrapItem>
          </Wrap>
          <Spacer/>
          <FiChevronRight />
        </HStack>
      </LinkOverlay>
    </LinkBox>
  )

  /*
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-start"
      onClick={onClick}
      action
      active={isActive}
      variant={variant}
    >
      <div className="ms-2 me-auto">
        <span className='fw-bold'>{title}</span>
        {` - ${author}`}
      </div>

      <div className="my-auto">
        <FontAwesomeIcon icon={faAngleRight}/>
      </div>
    </ListGroup.Item>
  );

   */
}

export default BookListEntry;