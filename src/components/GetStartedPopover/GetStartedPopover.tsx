import { Flex, VisuallyHidden } from '@aws-amplify/ui-react';

import { InternalLinkButton } from '@/components/InternalLinkButton';
import {
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
import { DEFAULT_PLATFORM, Platform } from '@/data/platforms';

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

type GetStartedPopoverType = {
  platform: Platform | typeof DEFAULT_PLATFORM;
  isGen1?: boolean;
};

export const GetStartedPopover = ({
  platform,
  isGen1
}: GetStartedPopoverType) => {
  return (
    <Flex className="split-button">
      <InternalLinkButton
        size="large"
        className="split-button__start"
        href={{
          pathname: `${isGen1 ? '/gen1' : ''}/[platform]/start/getting-started/introduction/`,
          query: { platform: platform }
        }}
      >
        Get started
      </InternalLinkButton>
      <Popover>
        <Popover.Trigger size="large" className="split-button__end">
          <VisuallyHidden>
            Toggle getting started guides navigation
          </VisuallyHidden>
        </Popover.Trigger>
        <Popover.List ariaLabel="Getting started guides for other platforms">
          {getStartedLinks.map((link, index) => {
            link.href.pathname = isGen1
              ? `/gen1/${link.href.pathname}`
              : link.href.pathname;

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
