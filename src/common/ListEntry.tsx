import React from 'react';
import { HStack, LinkBox, LinkOverlay, Spacer } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';

interface ListEntryProps {
  onClick: () => void,
  bgColor?: string,

  children: React.ReactNode,
}

const ListEntry = (props: ListEntryProps) => {
  const { onClick, children, bgColor } = props;

  return (
    <LinkBox>
      <LinkOverlay href="#" onClick={onClick}>
        <HStack
          borderWidth="1px"
          borderRadius="md"
          px={3}
          py={2}
          bg={bgColor ? bgColor : ""}
        >
          {children}
          <Spacer/>
          <FiChevronRight />
        </HStack>
      </LinkOverlay>
    </LinkBox>
  )

}

export default ListEntry;