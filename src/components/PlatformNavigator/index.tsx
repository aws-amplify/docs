import { useState, useRef, useEffect } from 'react';
import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import { IconChevron } from '@/components/Icons';
import { frameworks } from '@/constants/frameworks';
import { InfoPopover } from './InfoPopover';
import Link from 'next/link';
import classNames from 'classnames';
import { useClickOutside } from '@/utils/useClickOutside';

export function PlatformNavigator({ currentPlatform }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const triggerRef = useRef<HTMLButtonElement>(null);

  const contentRef = useClickOutside((e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  });

  useEffect(() => {
    if (isOpen) {
      contentRef?.current?.focus();
    }
  }, [isOpen]);

  const platformItem = frameworks.filter((platform) => {
    return platform.title === currentPlatform;
  })[0];

  return (
    <>
      <View className={`platform-navigator`}>
        <Text fontWeight="bold" paddingBottom="small">Choose your framework/language</Text>
        <Flex alignItems="center">
          <Button
            className={`platform-navigator__button`}
            aria-expanded={isOpen}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            isFullWidth={true}
            fontWeight="normal"
            ref={triggerRef}
          >
            <Flex as="span" alignItems="center">
              {platformItem.icon}
              {currentPlatform}
            </Flex>
            <IconChevron className={isOpen ? '' : 'icon-rotate-90-reverse'} />
          </Button>
          <InfoPopover platform={currentPlatform} />
        </Flex>
        <View
          className={classNames('popover', {
            'popover--expanded': isOpen
          })}
          as="nav"
          tabIndex={0}
          ref={contentRef}
          ariaLabel="Platform navigation"
        >
          <ul className="popover-list">
            {frameworks.map((platform, index) => {
            const title = platform.title;
            const current = title === currentPlatform;
            return (
              <li
                  className={classNames("popover-list__item",{"platform-navigator__dropdown__item--current":current})}
                  key={`platform-${index}`}
                >
                  <Link className="popover-list__link" href={platform.href}>
                    {platform.icon}
                    {platform.title}
                  </Link>
                </li>
            );
          })}
          </ul>
        </View>
      </View>
    </>
  );
}
