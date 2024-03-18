import Link from 'next/link';
import { View, Flex } from '@aws-amplify/ui-react';
import directory from '@/directory/directory.json';
import { useRouter } from 'next/router';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { IconChevron } from '@/components/Icons';

export const NextPrevious = () => {
  const platform = useCurrentPlatform();
  const router = useRouter();
  const pathname = router.pathname;

  const findDirectoryNodes = (
    route,
    dir = directory,
    platform,
    previous,
    next
  ) => {
    const children = dir?.children?.filter((child) => {
      return child?.platforms?.includes(platform);
    });
    if (dir.route === route) {
      return { previous, next };
    } else if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const res = findDirectoryNodes(
          route,
          child,
          platform,
          children[i - 1],
          children[i + 1]
        );
        if (res) return res;
      }
    }
  };

  const { previous, next } =
    findDirectoryNodes(pathname, directory, platform, null, null) || {};
  let nextHref, prevHref;
  if (next) {
    nextHref = {
      pathname: next.route,
      query: {
        platform
      }
    };
  }
  if (previous) {
    prevHref = {
      pathname: previous.route,
      query: {
        platform
      }
    };
  }

  const justifyContent =
    next && previous ? 'space-between' : previous ? 'flex-start' : 'flex-end';

  return (
    <Flex justifyContent={justifyContent} className="next-prev">
      {previous && (
        <Link href={prevHref}>
          <Flex>
            <IconChevron margin="auto" className="icon-rotate-90" />
            <Flex direction="column" gap="0">
              <View className="next-prev__label">PREVIOUS</View>
              <View className="next-prev__title">{previous.title}</View>
            </Flex>
          </Flex>
        </Link>
      )}
      {next && (
        <Link href={nextHref}>
          <Flex>
            <Flex direction="column" gap="0">
              <View className="next-prev__label">NEXT</View>
              <View className="next-prev__title">{next.title}</View>
            </Flex>
            <IconChevron margin="auto" className="icon-rotate-90-reverse" />
          </Flex>
        </Link>
      )}
    </Flex>
  );
};

export const NEXT_PREVIOUS_SECTIONS = [
  '/start/getting-started/',
  '/start/project-setup/',
  '/build-ui/formbuilder/',
  '/build-ui/uibuilder/',
  '/build-a-backend/auth/',
  '/build-a-backend/functions/',
  '/build-a-backend/graphqlapi/',
  '/build-a-backend/more-features/',
  '/build-a-backend/push-notifications/',
  '/build-a-backend/restapi/',
  '/build-a-backend/storage/',
  '/build-a-backend/utilities/',
  '/tools/cli/auth/',
  '/tools/cli/custom/',
  '/tools/cli/migration/',
  '/tools/cli/plugins/',
  '/tools/cli/project/',
  '/tools/cli/reference/',
  '/tools/cli/restapi/',
  '/tools/cli/start/',
  '/tools/cli/teams/',
  '/tools/cli/usage/',
  '/tools/console/adminui/',
  '/tools/console/auth/',
  '/tools/console/data/',
  '/tools/console/storage/',
  '/tools/console/tutorial/'
];
