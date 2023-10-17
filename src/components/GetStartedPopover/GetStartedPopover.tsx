import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  Button,
  Flex,
  VisuallyHidden,
  Link,
  View
} from '@aws-amplify/ui-react';
import { IconChevron } from '@/components/Icons';
import { useClickOutside } from '@/utils/useClickOutside';

export const GetStartedPopover = ({}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const contentRef = useClickOutside((e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      if (expanded) {
        setExpanded(false);
      }
    }
  });

  useEffect(() => {
    if (expanded) {
      contentRef?.current?.focus();
    }
  }, [expanded]);

  return (
    <Flex className="split-button">
      <Button
        as="a"
        href="/get-started/javascript"
        size="large"
        className="split-button__start"
      >
        Get started
      </Button>

      <View className="popover-wrapper">
        <Button
          onClick={() => setExpanded(!expanded)}
          ref={triggerRef}
          size="large"
          className="split-button__end"
        >
          <IconChevron
            aria-hidden="true"
            className={classNames('split-button__end-icon', {
              'icon-rotate-180-reverse': expanded
            })}
          />
          <VisuallyHidden>
            Toggle getting started guides navigation
          </VisuallyHidden>
        </Button>

        <View
          className={classNames('popover', {
            'popover--expanded': expanded
          })}
          as="nav"
          tabIndex={0}
          ref={contentRef}
          aria-label="Getting started guides for other platforms"
        >
          <ul className="plain-list">
            <li>
              <Link href="/javascript/get-started">JavaScript</Link>
            </li>
            <li>
              <Link href="/react/get-started">React</Link>
            </li>
            <li>
              <Link href="/flutter/get-started">Flutter</Link>
            </li>
            <li>
              <Link href="/swift/get-started">Swift</Link>
            </li>
            <li>
              <Link href="/android/get-started">Android</Link>
            </li>
            <li>
              <Link href="/react-native/get-started">React Native</Link>
            </li>
            <li>
              <Link href="/angular/get-started">Angular</Link>
            </li>
            <li>
              <Link href="/angular/get-started">Next.js</Link>
            </li>
            <li>
              <Link href="/vue/get-started">Vue</Link>
            </li>
          </ul>
        </View>
      </View>
    </Flex>
  );
};
