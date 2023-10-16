import * as React from 'react';
import { usePopover } from './usePopover';
import { isFunction } from '@aws-amplify/ui';

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

export const PopoverTrigger = ({ children }: PopoverTriggerProps) => {
  const { expanded, setExpanded, triggerRef, contentRef, id } = usePopover();
  const { onClick } = children.props;
  console.log('id: ', id);

  const togglePopover = React.useCallback(() => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
    if (isFunction(onClick)) {
      onClick();
    }
  }, [expanded, onClick, contentRef, setExpanded]);

  React.useEffect(() => {
    if (expanded) {
      contentRef?.current?.focus();
    }
  }, [expanded]);

  return React.cloneElement(children, {
    'aria-expanded': expanded,
    'aria-controls': id,
    ref: triggerRef,
    onClick: togglePopover
  });
};
