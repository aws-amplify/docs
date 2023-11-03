import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Button, Flex, VisuallyHidden, View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import {
  IconChevron,
  IconAndroid,
  IconAngular,
  IconFlutter,
  IconJS,
  IconNext,
  IconReact,
  IconSwift,
  IconVue
} from '@/components/Icons';
import { useClickOutside } from '@/utils/useClickOutside';
import { DEFAULT_PLATFORM } from '@/data/platforms';

const getStartedLinks = [
  {
    title: 'JavaScript',
    href: '/javascript/get-started',
    icon: <IconJS />
  },
  {
    title: 'React',
    href: '/react/get-started',
    icon: <IconReact />
  },
  {
    title: 'Flutter',
    href: '/flutter/get-started',
    icon: <IconFlutter />
  },
  {
    title: 'Swift',
    href: '/swift/get-started',
    icon: <IconSwift />
  },
  {
    title: 'Android',
    href: '/android/get-started',
    icon: <IconAndroid />
  },
  {
    title: 'React Native',
    href: '/react-native/get-started',
    icon: <IconReact />
  },
  {
    title: 'Angular',
    href: '/angular/get-started',
    icon: <IconAngular />
  },
  {
    title: 'Next.js',
    href: '/nextjs/get-started',
    icon: <IconNext />
  },
  {
    title: 'Vue',
    href: '/vue/get-started',
    icon: <IconVue />
  }
];

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
      <Link
        href={{
          pathname: '/[platform]/get-started',
          query: { platform: DEFAULT_PLATFORM }
        }}
      >
        <Button size="large" className="split-button__start">
          Get started
        </Button>
      </Link>

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
          <ul className="popover-list">
            {getStartedLinks.map((link, index) => {
              return (
                <li
                  className="popover-list__item"
                  key={`getStartedLink-${index}`}
                >
                  <Link className="popover-list__link" href={link.href}>
                    {link.icon}
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </View>
      </View>
    </Flex>
  );
};
