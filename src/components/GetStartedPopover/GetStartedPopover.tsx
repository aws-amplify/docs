import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Button, Flex, VisuallyHidden, View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { InternalLinkButton } from '@/components/InternalLinkButton';
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
import { useTabKeyDetection } from '@/utils/useTabKeyDetection';

const getStartedHref = '/[platform]/start/getting-started/introduction/';

const getStartedLinks = [
  {
    title: 'React',
    href: {
      pathname: getStartedHref,
      query: { platform: 'react' }
    },
    icon: <IconReact />
  },
  {
    title: 'JavaScript',
    href: {
      pathname: getStartedHref,
      query: { platform: 'javascript' }
    },
    icon: <IconJS />
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

export const GetStartedPopover = (platform) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const contentRef = useClickOutside((e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      if (expanded) {
        setExpanded(false);
      }
    }
  });

  const { isTabKeyPressed, setIsTabKeyPressed } =
    useTabKeyDetection(contentRef);

  useEffect(() => {
    if (expanded) {
      contentRef?.current?.focus();
    }
  }, [expanded, contentRef]);

  const handleBlur = (e) => {
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
  };

  platform = platform.platform;

  return (
    <Flex className="split-button">
      <InternalLinkButton
        size="large"
        className="split-button__start"
        href={{
          pathname: '/[platform]/start/getting-started/introduction/',
          query: { platform: platform }
        }}
      >
        Get started
      </InternalLinkButton>

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
