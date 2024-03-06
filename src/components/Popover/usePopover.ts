import { useContext, createContext } from 'react';

export interface PopoverContextType {
  contentRef?: any;
  triggerRef?: React.Ref<HTMLButtonElement>;
  handleExpansion: (expanded: boolean) => void;
  handleBlur: (e: any) => void;
  expanded: boolean;
}

export const PopoverContext = createContext<PopoverContextType>({
  contentRef: undefined,
  triggerRef: undefined,
  handleExpansion: () => {},
  handleBlur: () => {},
  expanded: false
});

export const usePopover = (): PopoverContextType => useContext(PopoverContext);
