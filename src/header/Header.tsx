import React, { useState } from 'react';
import MenuToggle from './MenuToggle';
import Logo from './Logo';
import MenuLinks from './MenuLinks';
import { Center, Spacer } from '@chakra-ui/react';
import HeaderContainer from './HeaderContainer';

interface HeaderProps {
  showLinks?: boolean
}

const Header = (props: HeaderProps) => {
  const { showLinks } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <HeaderContainer center={!showLinks}>
      <Logo />

      {showLinks && (
        <>
          <MenuToggle toggle={toggle} isOpen={isOpen} />
          <MenuLinks isOpen={isOpen}/>
        </>
      )}

    </HeaderContainer>
  );
};

export default Header;