import { Flex, Text, View } from '@aws-amplify/ui-react';
import { frameworks } from '@/constants/frameworks';

import { VersionSwitcher } from '../VersionSwitcher';
import { Popover } from '../Popover';
import {
  PLATFORM_VERSIONS,
  PLATFORM_DISPLAY_NAMES,
  Platform
} from '@/data/platforms';

type PlatformNavigatorProps = {
  currentPlatform: Platform;
  isGen1: boolean;
};

export function PlatformNavigator({
  currentPlatform,
  isGen1
}: PlatformNavigatorProps) {
  const platformTitle = PLATFORM_DISPLAY_NAMES[currentPlatform];

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
          <Popover flex="1 0 auto">
            <Popover.Trigger
              className={`platform-navigator__button`}
              isFullWidth={true}
            >
              {platformItem.icon}
              {platformTitle}
            </Popover.Trigger>
            <Popover.List anchor="left" fullWidth={true}>
              {frameworks.map((platform, index) => {
                const title = platform.title;
                const current = title === platformTitle;
                return (
                  <Popover.ListItem
                    current={current}
                    key={`platform-${index}`}
                    href={isGen1 ? `/gen1${platform.href}` : platform.href}
                  >
                    {platform.icon}
                    {platform.title}
                  </Popover.ListItem>
                );
              })}
            </Popover.List>
          </Popover>

          {isGen1 && PLATFORM_VERSIONS[currentPlatform] && (
            <VersionSwitcher platform={currentPlatform} />
          )}
        </Flex>
      </View>
    </>
  );
}
