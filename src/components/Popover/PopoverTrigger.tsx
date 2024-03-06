import { Button, ButtonProps } from '@aws-amplify/ui-react';
import { usePopover } from './usePopover';

interface PopoverTriggerProps extends ButtonProps {}

export const PopoverTrigger = ({ children, ...rest }: PopoverTriggerProps) => {
  const { triggerRef, handleExpansion, expanded } = usePopover();

  return (
    <Button
      onClick={() => handleExpansion(expanded)}
      ref={triggerRef}
      size="large"
      {...rest}
    >
      {children}
    </Button>
  );
};
