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
    setTimeout(function() {
      if (typeof document !== 'undefined') {
        const menu = document.getElementById('menu');
        const buttons = document.getElementById('menuButtons');
        if (menu) menu.style.left = '0';
        if (buttons) buttons.style.right = '-100vw';
      }
    }, 1);
  };

  const showTOC = () => {
    if (typeof document !== 'undefined') {
      const toc = document.getElementById('toc');
      const buttons = document.getElementById('menuButtons');
      if (toc) toc.style.left = '0';
      if (buttons) buttons.style.right = '-100vw';
    }
  };

  return (
    <Toggle id="menuButtons">
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
