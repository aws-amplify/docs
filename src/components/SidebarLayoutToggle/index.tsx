import {Toggle} from "./styles";
import {useState, useEffect} from "react";
import ensureMenuScrolledIntoView from "../../utils/ensure-menu-scrolled-into-view";

export default function SidebarLayoutToggle({menuRef, children}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView && menuRef.current) {
      menuRef.current.openMenu();
    }
    if (!inView && menuRef.current) {
      menuRef.current.closeMenu();
    }
  }, [inView, menuRef]);

  const toggleView = () => {
    if (inView) {
      setInView(false);
    } else {
      setInView(true);
    }
  };
  return (
    <Toggle
      onClick={() => {
        toggleView();
        ensureMenuScrolledIntoView();
      }}
      inView={inView}
    >
      {children}
    </Toggle>
  );
}
