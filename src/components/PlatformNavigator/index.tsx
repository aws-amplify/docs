import type { Platform } from '@/constants/platforms';
import { Flex, Text, View } from '@aws-amplify/ui-react';
import { FRAMEWORKS } from '@/constants/frameworks';
import { PLATFORM_VERSIONS, PLATFORMS } from '@/constants/platforms';
import { useRouter } from 'next/router';
import type { LinkProps } from 'next/link';
import { VersionSwitcher } from '../VersionSwitcher';
import flatDirectory from '@/directory/flatDirectory.json';
import { Popover } from '../Popover';

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
  
  const platformTitle = PLATFORMS[currentPlatform];

  const platformItem = FRAMEWORKS.filter((platform) => {
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
              className={`platform-navigator__button`}
              isFullWidth={true}
              aria-describedby="platformNavigatorLabel"
            >
              {platformItem.icon}
              {platformTitle}
            </Popover.Trigger>
            <Popover.List
              testId={testId ? `${testId}-popoverList` : ''}
              anchor="left"
              fullWidth={true}
            >
              {FRAMEWORKS.map((platform, index) => {
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
                  href = isGen1 ? `/gen1${platform.href}` : platform.href;
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
