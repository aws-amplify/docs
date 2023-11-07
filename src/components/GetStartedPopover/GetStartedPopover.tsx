import { useState, useEffect, useRef, useCallback } from 'react';
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
import { DEFAULT_PLATFORM, Platform } from '@/data/platforms';

const getStartedHref = '/[platform]/start/getting-started/introduction/';

const getStartedLinks = [
  {
    title: 'JavaScript',
    href: {
      pathname: getStartedHref,
      query: { platform: 'javascript' }
    },
    icon: <IconJS />
  },
  {
    title: 'React',
    href: {
      pathname: getStartedHref,
      query: { platform: 'react' }
    },
    icon: <IconReact />
  },
  {
    title: 'Flutter',
    href: {
      pathname: getStartedHref,
      query: { platform: 'flutter' }
    },
    icon: <IconFlutter />
  },
  {
    title: 'Swift',
    href: {
      pathname: getStartedHref,
      query: { platform: 'swift' }
    },
    icon: <IconSwift />
  },
  {
    title: 'Android',
    href: {
      pathname: getStartedHref,
      query: { platform: 'android' }
    },
    icon: <IconAndroid />
  },
  {
    title: 'React Native',
    href: {
      pathname: getStartedHref,
      query: { platform: 'react-native' }
    },
    icon: <IconReact />
  },
  {
    title: 'Angular',
    href: {
      pathname: getStartedHref,
      query: { platform: 'angular' }
    },
    icon: <IconAngular />
  },
  {
    title: 'Next.js',
    href: {
      pathname: getStartedHref,
      query: { platform: 'nextjs' }
    },
    icon: <IconNext />
  },
  {
    title: 'Vue',
    href: {
      pathname: getStartedHref,
      query: { platform: 'vue' }
    },
    icon: <IconVue />
  }
];

export const GetStartedPopover = () => {
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

  const handleBlur = useCallback(
    (e) => {
      // Use relatedTarget to see if the target receiving focus is outside of the popover
      if (contentRef.current && !contentRef.current.contains(e.relatedTarget)) {
        setExpanded(false);
      }
    },
    [contentRef]
  );

  return (
    <Flex className="split-button">
      <Link
        href={{
          pathname: '/[platform]/start/getting-started/introduction/',
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
          onBlur={handleBlur}
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
