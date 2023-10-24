import { useState } from 'react';
import { Button, Link, Flex, Image, View } from '@aws-amplify/ui-react';
import { IconChevron } from '@/components/Icons';
import { frameworks } from '@/constants/frameworks';
import { InfoPopover } from './InfoPopover';

export function PlatformNavigator({ currentPlatform }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const platformItem = frameworks.filter((platform) => {
    return platform.title === currentPlatform;
  })[0];

  return (
    <>
      <nav aria-labelledby="platformBtn" className={`platform-navigator`}>
        Choose your framework:
        <Flex alignItems="center">
          <Button
            className={`platform-navigator__button`}
            aria-expanded="false"
            id="platformBtn"
            aria-controls="platformNav"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            isFullWidth={true}
          >
            <Flex as="span" alignItems="center">
              {platformItem.icon}
              {currentPlatform}
            </Flex>
            <IconChevron className={isOpen ? '' : 'icon-rotate-90-reverse'} />
          </Button>
          {showInfo && <InfoPopover platform={currentPlatform} />}
        </Flex>
        <ul
          id="platformNav"
          className={`platform-navigator__dropdown ${
            isOpen ? 'platform-navigator__dropdown--show' : ''
          }`}
          aria-expanded={isOpen}
        >
          {frameworks.map((platform) => {
            const title = platform.title;
            const current = title === currentPlatform;
            return (
              <li
                className={`platform-navigator__dropdown__item ${
                  current ? 'platform-navigator__dropdown__item--current' : ''
                }`}
              >
                <Link
                  href={platform.href}
                  key={platform.title}
                  aria-current={current}
                  className={`platform-navigator__dropdown__link`}
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
    </>
  );
}
