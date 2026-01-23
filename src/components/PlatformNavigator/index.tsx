import { Flex, Text, View } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import type { LinkProps } from 'next/link';
import { frameworks } from '@/constants/frameworks';
import { VersionSwitcher } from '../VersionSwitcher';
import flatDirectory from '@/directory/flatDirectory.json';
import { Popover } from '../Popover';
import {
  PLATFORM_VERSIONS,
  PLATFORM_DISPLAY_NAMES,
  Platform
} from '@/data/platforms';

type PlatformNavigatorProps = {
  currentPlatform: Platform;
  isGen1: boolean;
  testId?: string;
};

export function PlatformNavigator({
  currentPlatform,
  isGen1,
  testId
}: PlatformNavigatorProps) {
  const { pathname } = useRouter();

  /**
   * Get the allowed platforms associated with this pathname
   * from flatDirectory.json */
  let allowedPlatforms: string[] = [];
  if (flatDirectory[pathname]?.platforms) {
    allowedPlatforms = flatDirectory[pathname].platforms;
  }

  const platformTitle = PLATFORM_DISPLAY_NAMES[currentPlatform];

  const platformItem = frameworks.filter((platform) => {
    return platform.title === platformTitle;
  })[0];

  return (
    <>
      <View className={`platform-navigator`}>
        <Text
          fontWeight="bold"
          id="platformNavigatorLabel"
          paddingBottom="small"
        >
          Choose your framework/language
        </Text>
        <Flex alignItems="center">
          <Popover flex="1 0 auto">
            <Popover.Trigger
              id="selectedLabel"
              className={`platform-navigator__button`}
              isFullWidth={true}
              aria-labelledby="platformNavigatorLabel selectedLabel"
            >
              {platformItem.icon}
              {platformTitle}
            </Popover.Trigger>
            <Popover.List
              testId={testId ? `${testId}-popoverList` : ''}
              anchor="left"
              fullWidth={true}
            >
              {frameworks.map((platform, index) => {
                const title = platform.title;
                const current = title === platformTitle;
                let href: LinkProps['href'];

                /**
                 * If this platform in the list exists for the current pathname,
                 * we'll link to that platforms version of the page.
                 */

                if (
                  allowedPlatforms.includes(platform.key) &&
                  pathname !== '/gen1'
                ) {
                  href = {
                    pathname,
                    query: { platform: platform.key }
                  };
                  /**
                   * If this platform doesn't exist for the current pathname,
                   * we link to the root page for the platform instead.
                   */
                } else {
                  href = isGen1 ? `/legacy/gen1${platform.href}` : `/legacy/${platform.href}`;
                }

                return (
                  <Popover.ListItem
                    current={current}
                    key={`platform-${index}`}
                    href={href}
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
