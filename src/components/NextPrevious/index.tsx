import Link from 'next/link';
import { View, Flex } from '@aws-amplify/ui-react';
import directory from '@/directory/directory.json';
import { useRouter } from 'next/router';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { IconChevron } from '@/components/Icons';
import { useIsGen1Page } from '@/utils/useIsGen1Page';

export const NextPrevious = () => {
  const platform = useCurrentPlatform();
  const router = useRouter();
  const pathname = router.pathname;
  const isGen1 = useIsGen1Page();

  const findDirectoryNodes = (route, dir, platform, previous, next) => {
    const children = dir?.children?.filter((child) => {
      if (isGen1) {
        return (
          child?.route.startsWith('/gen1') &&
          child?.platforms?.includes(platform)
        );
      } else {
        return child?.platforms?.includes(platform);
      }
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
  '/gen1/[platform]/start/getting-started/',
  '/gen1/[platform]/start/project-setup/',
  '/gen1/[platform]/build-ui/formbuilder/',
  '/gen1/[platform]/build-ui/uibuilder/',
  '/gen1/[platform]/build-a-backend/auth/',
  '/gen1/[platform]/build-a-backend/functions/',
  '/gen1/[platform]/build-a-backend/graphqlapi/',
  '/gen1/[platform]/build-a-backend/more-features/',
  '/gen1/[platform]/build-a-backend/push-notifications/',
  '/gen1/[platform]/build-a-backend/restapi/',
  '/gen1/[platform]/build-a-backend/storage/',
  '/gen1/[platform]/build-a-backend/utilities/',
  '/gen1/[platform]/tools/cli/auth/',
  '/gen1/[platform]/tools/cli/custom/',
  '/gen1/[platform]/tools/cli/migration/',
  '/gen1/[platform]/tools/cli/plugins/',
  '/gen1/[platform]/tools/cli/project/',
  '/gen1/[platform]/tools/cli/reference/',
  '/gen1/[platform]/tools/cli/restapi/',
  '/gen1/[platform]/tools/cli/start/',
  '/gen1/[platform]/tools/cli/teams/',
  '/gen1/[platform]/tools/cli/usage/',
  '/gen1/[platform]/tools/console/adminui/',
  '/gen1/[platform]/tools/console/auth/',
  '/gen1/[platform]/tools/console/data/',
  '/gen1/[platform]/tools/console/storage/',
  '/gen1/[platform]/tools/console/tutorial/',
  '/[platform]/build-a-backend/auth/',
  '/[platform]/build-a-backend/data/',
  '/[platform]/build-a-backend/storage/',
  '/[platform]/build-a-backend/functions/',
  '/[platform]/build-a-backend/add-aws-services/',
  '/[platform]/build-ui/formbuilder/',
  '/[platform]/deploy-and-host/sandbox-environments/',
  '/[platform]/deploy-and-host/fullstack-branching/'
];
