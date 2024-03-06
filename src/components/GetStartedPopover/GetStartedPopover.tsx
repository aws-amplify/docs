import classNames from 'classnames';
import { Flex, VisuallyHidden } from '@aws-amplify/ui-react';

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

import { Popover } from '@/components/Popover';

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
      <Popover>
        <Popover.Trigger size="large" className="split-button__end">
          <IconChevron
            aria-hidden="true"
            className={classNames('split-button__end-icon', {
              'icon-rotate-180-reverse': false
            })}
          />
          <VisuallyHidden>
            Toggle getting started guides navigation
          </VisuallyHidden>
        </Popover.Trigger>
        <Popover.List aria-label="Getting started guides for other platforms">
          {getStartedLinks.map((link, index) => {
            return (
              <Popover.ListItem
                href={link.href}
                key={`getStartedLink-${index}`}
              >
                {link.icon}
                {link.title}
              </Popover.ListItem>
            );
          })}
        </Popover.List>
      </Popover>
    </Flex>
  );
};
