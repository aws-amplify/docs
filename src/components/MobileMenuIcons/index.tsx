import { Toggle, Divider } from './styles';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { Button } from '@cloudscape-design/components';
import { TABLE_OF_CONTENTS_OPEN } from '../../constants/img';

function MobileMenuIcons({ menuRef, contentsRef }, ref) {
  // const buttonsRef = useRef(null);

  console.log(ref);

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
        const menu = menuRef.current.ref.current;
        const buttons = ref.current;
        if (menu) menu.style.left = '0';
        if (buttons) buttons.style.right = '-100vw';
      }
    }, 1);
  };

  const showTOC = () => {
    if (typeof document !== 'undefined') {
      const toc = document.getElementById('toc');
      const buttons = ref.current;
      if (toc) toc.style.left = '0';
      if (buttons) buttons.style.right = '-100vw';
    }
  };

  return (
    <Toggle ref={ref}>
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

export default forwardRef(MobileMenuIcons);
