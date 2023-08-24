import { Toggle, Divider } from './styles';
import { useEffect, forwardRef } from 'react';
import { MenuIcon, TOCIcon } from '../Icons';

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
      <MenuIcon ariaLabel="Open Menu" onClick={showMenu} />
      <Divider />
      <TOCIcon ariaLabel="Open Table of Contents" onClick={showTOC} />
    </Toggle>
  );
}

export default forwardRef(MobileMenuIcons);
