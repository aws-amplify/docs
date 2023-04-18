import { Toggle, Divider } from './styles';
import { useState, useEffect } from 'react';
import { Button } from '@cloudscape-design/components';
import { TABLE_OF_CONTENTS_OPEN } from '../../constants/img';

export default function MobileMenuIcons({ menuRef }) {
  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.openMenu();
    }
    if (menuRef.current) {
      menuRef.current.closeMenu();
    }
  }, [menuRef]);

  const showMenu = () => {
    menuRef.current.openMenu();
  };

  const showTOC = () => {
    if (typeof document !== 'undefined') {
      const toc = document.getElementById('toc');
      if (toc) toc.style.display = 'flex';
    }
  };

  return (
    <Toggle>
      <Button iconName="menu" variant="icon" onClick={showMenu} />
      <Divider />
      <Button
        iconUrl={TABLE_OF_CONTENTS_OPEN.src}
        variant="icon"
        onClick={showTOC}
      />
    </Toggle>
  );
}
