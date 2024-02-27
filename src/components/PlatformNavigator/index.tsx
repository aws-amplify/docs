import { useState, useRef, useEffect } from 'react';
import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import { IconChevron } from '@/components/Icons';
import { frameworks } from '@/constants/frameworks';
import Link from 'next/link';
import classNames from 'classnames';
import { useClickOutside } from '@/utils/useClickOutside';
import { VersionSwitcher } from '../VersionSwitcher';
import {
  PLATFORM_VERSIONS,
  PLATFORM_DISPLAY_NAMES,
  Platform
} from '@/data/platforms';
import { useTabKeyDetection } from '@/utils/useTabKeyDetection';

type PlatformNavigatorProps = {
  currentPlatform: Platform;
  isGen1: boolean;
};

export function PlatformNavigator({
  currentPlatform,
  isGen1
}: PlatformNavigatorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const platformTitle = PLATFORM_DISPLAY_NAMES[currentPlatform];

  const contentRef = useClickOutside((e) => {
    if (triggerRef.current && !triggerRef.current.contains(e.target)) {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  });

  const { isTabKeyPressed, setIsTabKeyPressed } =
    useTabKeyDetection(contentRef);

  const handleBlur = (e) => {
    // Use relatedTarget to see if the target receiving focus is outside of the popover
    if (
      contentRef.current &&
      !contentRef.current.contains(e.relatedTarget) &&
      isTabKeyPressed
    ) {
      if (isOpen) {
        setIsOpen(false);

        // Since the custom hook is only listening to the keydown and keyup
        // event on the ref we pass in, the keyup event doesn't get registered
        // when we lose focus and so the state isn't reset. Reset it here
        setIsTabKeyPressed(false);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      contentRef?.current?.focus();
    }
  }, [isOpen, contentRef]);

  const platformItem = frameworks.filter((platform) => {
    return platform.title === platformTitle;
  })[0];

  return (
    <>
      <View className={`platform-navigator`}>
        <Text fontWeight="bold" paddingBottom="small">
          Choose your framework/language
        </Text>
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
            flex="1 1 0"
            paddingInline="xs"
          >
            <Flex as="span" alignItems="center" gap="xs">
              {platformItem.icon}
              {platformTitle}
            </Flex>
            <IconChevron
              fontSize="xs"
              className={isOpen ? '' : 'icon-rotate-90-reverse'}
            />
          </Button>
          {PLATFORM_VERSIONS[currentPlatform] && isGen1 && (
            <VersionSwitcher platform={currentPlatform} flex="1 1 0" />
          )}
        </Flex>
        <View
          className={classNames('popover', {
            'popover--expanded': isOpen
          })}
          as="nav"
          tabIndex={0}
          ref={contentRef}
          onBlur={handleBlur}
          ariaLabel="Platform navigation"
        >
          <ul className="popover-list">
            {frameworks.map((platform, index) => {
              const title = platform.title;
              const current = title === platformTitle;
              return (
                <li className="popover-list__item" key={`platform-${index}`}>
                  <Link
                    className={classNames('popover-list__link', {
                      'popover-list__link--current': current
                    })}
                    href={isGen1 ? `/gen1/${platform.href}` : platform.href}
                    onClick={() => setIsOpen(false)}
                  >
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
