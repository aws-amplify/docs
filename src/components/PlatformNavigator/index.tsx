import { useState } from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { IconChevron } from '@/components/Icons';
import { frameworks } from '@/constants/frameworks';
import { InfoPopover } from './InfoPopover';
import Link from 'next/link';

export function PlatformNavigator({ currentPlatform }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const platformItem = frameworks.filter((platform) => {
    return platform.title === currentPlatform;
  })[0];

  return (
    <>
      <nav aria-labelledby="platformBtn" className={`platform-navigator`}>
        <Text fontWeight={"bold"}>Choose your framework/language</Text>
        <Flex alignItems="center">
          <Button
            className={`platform-navigator__button`}
            aria-expanded={isOpen}
            id="platformBtn"
            aria-controls="platformNav"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            isFullWidth={true}
            fontWeight={"normal"}
          >
            <Flex as="span" alignItems="center">
              {platformItem.icon}
              {currentPlatform}
            </Flex>
            <IconChevron className={isOpen ? '' : 'icon-rotate-90-reverse'} />
          </Button>
          <InfoPopover platform={currentPlatform} />
        </Flex>
        <nav
          id="platformNav"
          className={`platform-navigator__dropdown ${
            isOpen ? 'platform-navigator__dropdown--show' : ''
          }`}
          aria-expanded={isOpen}
        >
          <ul>
          {frameworks.map((platform) => {
            const title = platform.title;
            const current = title === currentPlatform;
            return (
              <li
                className={`platform-navigator__dropdown__item ${
                  current ? 'platform-navigator__dropdown__item--current' : ''
                }`}
                key={platform.title}
              >
                <Link
                  href={platform.href}
                  key={platform.title}
                  aria-current={current}
                  className={`platform-navigator__dropdown__link amplify-link`}
                >
                  <Flex as="span" alignItems="center">
                    {platform.icon}
                    {platform.title}
                  </Flex>
                </Link>
              </li>
            );
          })}
          </ul>
        </nav>
      </nav>
    </>
  );
}
