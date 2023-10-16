import * as React from 'react';

export interface PopoverContextType {
  expanded?: boolean;
  contentRef?: React.RefObject<HTMLDivElement>;
  id?: string;
  setExpanded: (dismissed: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

export const PopoverContext = React.createContext<PopoverContextType>({
  expanded: false,
  setExpanded: () => {}
});

export const usePopover = (): PopoverContextType =>
  React.useContext(PopoverContext);
