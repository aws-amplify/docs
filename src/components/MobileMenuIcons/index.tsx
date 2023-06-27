import { Toggle, Divider } from './styles';
import { useEffect, forwardRef } from 'react';
import { Button } from '@cloudscape-design/components';
import { TABLE_OF_CONTENTS_OPEN } from '../../constants/img';

function MobileMenuIcons({ menuRef, contentsRef }, ref) {
  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.openMenu();
    }
  }, [menuRef]);

  const showMenu = () => {
    menuRef.current.openMenu();
    const menu = menuRef.current.ref.current;
    const buttons = ref.current;
    if (menu) {
      menu.classList.add('slideIn');
      menu.classList.remove('slideOut');
    }
    if (buttons) {
      buttons.classList.add('slideOut');
      buttons.classList.remove('slideIn');
    }
  };

  const showTOC = () => {
    const toc = contentsRef.current;
    const buttons = ref.current;
    if (toc) {
      toc.classList.add('slideIn');
      toc.classList.remove('slideOut');
    }
    if (buttons) {
      buttons.classList.add('slideOut');
      buttons.classList.remove('slideIn');
    }
  };

  return (
    <Toggle ref={ref}>
      <Button
        iconName="menu"
        variant="icon"
        onClick={showMenu}
        ariaLabel="Open Menu"
      />
      <Divider />
      <Button
        iconUrl={TABLE_OF_CONTENTS_OPEN.src}
        variant="icon"
        onClick={showTOC}
        ariaLabel="Open Table of Contents"
      />
    </Toggle>
  );
}

export default forwardRef(MobileMenuIcons);
