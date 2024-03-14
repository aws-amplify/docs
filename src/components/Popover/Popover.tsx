import {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useId
} from 'react';
import { View, ViewProps } from '@aws-amplify/ui-react';
import { PopoverTrigger } from './PopoverTrigger';
import { PopoverList } from './PopoverList';
import { PopoverListItem } from './PopoverListItem';
import { PopoverContext } from './usePopover';
import { useClickOutside } from '@/utils/useClickOutside';
import { useTabKeyDetection } from '@/utils/useTabKeyDetection';

interface PopoverPrimitiveProps extends ViewProps {}

const PopoverPrimitive = ({
  children,
  testId,
  ...rest
}: PopoverPrimitiveProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const navId = useId();

  const contentRef = useClickOutside((e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      if (expanded) {
        setExpanded(false);
      }
    }
  });
  const { isTabKeyPressed, setIsTabKeyPressed } =
    useTabKeyDetection(contentRef);

  const handleExpansion = useCallback(() => {
    setExpanded(!expanded);
  }, [setExpanded, expanded]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      // Use relatedTarget to see if the target receiving focus is outside of the popover
      if (
        contentRef.current &&
        !contentRef.current.contains(e.relatedTarget) &&
        isTabKeyPressed
      ) {
        if (expanded) {
          setExpanded(false);

          // Since the custom hook is only listening to the keydown and keyup
          // event on the ref we pass in, the keyup event doesn't get registered
          // when we lose focus and so the state isn't reset. Reset it here
          setIsTabKeyPressed(false);
        }
      }
    },
    [contentRef, expanded, isTabKeyPressed, setIsTabKeyPressed]
  );

  const value = useMemo(
    () => ({
      navId,
      triggerRef,
      contentRef,
      expanded,
      handleBlur,
      handleExpansion
    }),
    [navId, contentRef, triggerRef, expanded, handleBlur, handleExpansion]
  );

  useEffect(() => {
    if (expanded) {
      contentRef?.current?.focus();
    }
  }, [expanded, contentRef]);

  return (
    <PopoverContext.Provider value={value}>
      <View className="popover-wrapper" {...rest} testId={testId}>
        {children}
      </View>
    </PopoverContext.Provider>
  );
};

const Popover = Object.assign(PopoverPrimitive, {
  Trigger: PopoverTrigger,
  List: PopoverList,
  ListItem: PopoverListItem
});

export { Popover };
