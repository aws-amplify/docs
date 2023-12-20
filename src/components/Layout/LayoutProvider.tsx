import { createContext, Dispatch, SetStateAction } from 'react';

type LayoutContextType = {
  menuOpen: boolean;
  toggleMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const LayoutContext = createContext<LayoutContextType>({
  menuOpen: false,
  toggleMenuOpen: () => {}
});

export function LayoutProvider({ value, children }) {
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
