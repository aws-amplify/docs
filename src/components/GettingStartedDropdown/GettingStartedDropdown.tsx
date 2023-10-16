import { useState, useRef } from 'react';
import {
  Button,
  View,
  Flex,
  Link,
  VisuallyHidden
} from '@aws-amplify/ui-react';

import { IconChevron } from '@/components/Icons';
import { Popover } from '@/components/Popover';

export const GettingStartedDropdown = () => {
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
      <Popover id="gettingStartedList">
        <Popover.Trigger>
          <Button size="large" className="split-button__end">
            <IconChevron
              aria-hidden="true"
              className="split-button__end-icon"
            />
            <VisuallyHidden>
              Toggle getting started guides dropdown
            </VisuallyHidden>
          </Button>
        </Popover.Trigger>
        <Popover.Content minWidth="14rem" offset={{ y: '-2px' }}>
          <View
            as="nav"
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
        </Popover.Content>
      </Popover>
    </Flex>
  );
};
