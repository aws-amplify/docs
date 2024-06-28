import { useContext, createContext } from 'react';

export interface PopoverContextType {
  contentRef?: React.Ref<HTMLDivElement>;
  triggerRef?: React.Ref<HTMLButtonElement>;
  handleExpansion: (expanded: boolean) => void;
  handleBlur: (e: React.FocusEvent<HTMLElement>) => void;
  expanded: boolean;
  navId: string;
}

export const PopoverContext = createContext<PopoverContextType>({
  handleExpansion: () => {},
  handleBlur: () => {},
  expanded: false,
  navId: ''
});

export const usePopover = (): PopoverContextType => useContext(PopoverContext);
