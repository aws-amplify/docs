import * as React from 'react';
import { View } from '@aws-amplify/ui-react';
import { PopoverContext } from './usePopover';
import { PopoverTrigger, PopoverTriggerProps } from './PopoverTrigger';
import { PopoverContent, PopoverContentProps } from './PopoverContent';
import { useClickOutside } from './useClickOutside';

interface PopoverPrimitiveProps {
  children:
    | React.ReactElement<PopoverContentProps>[]
    | React.ReactElement<PopoverTriggerProps>[];
  id: string;
}

export const PopoverPrimitive = ({ children, id }: PopoverPrimitiveProps) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const contentRef = useClickOutside((e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      if (expanded) {
        setExpanded(false);
      }
    }
  });

  const value = React.useMemo(
    () => ({
      contentRef,
      expanded,
      id,
      setExpanded,
      triggerRef
    }),
    [expanded, id, setExpanded]
  );
  return (
    <PopoverContext.Provider value={value}>
      <View className="popover">{children}</View>
    </PopoverContext.Provider>
  );
};

export const Popover = Object.assign(PopoverPrimitive, {
  Trigger: PopoverTrigger,
  Content: PopoverContent
});
