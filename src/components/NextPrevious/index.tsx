import Link from 'next/link';
import { View, Flex } from '@aws-amplify/ui-react';
import directory from 'src/directory/directory.json';
import { useRouter } from 'next/router';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

export const NextPrevious = () => {

  const platform = useCurrentPlatform();
  const router = useRouter();
  const pathname = router.pathname;

  const findDirectoryNodes = (route, dir = directory, platform, previous, next) => {
    const children = dir?.children?.filter((child) => {
      return child?.platforms?.includes(platform);
    });
    if (dir.route === route) {
      return { previous, next };
    } else if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        let res = findDirectoryNodes(route, child, platform, children[i - 1], children[i + 1]);
        if (res) return res;
      }
      return {};
    }
  }

  const { previous, next } = findDirectoryNodes(pathname, directory, platform, null, null);
  let nextHref, prevHref;
  if (next) {
    nextHref = {
      pathname: next.route,
      query: {
        platform
      }
    }
  }
  if (previous) {
    prevHref = {
      pathname: previous.route,
      query: {
        platform
      }
    }
  }

  const justifyContent = next && previous ?
    'space-between' : previous ? 'flex-start' : 'flex-end';


  return (
    <Flex justifyContent={justifyContent} className="next-prev">
      {previous &&
        (<Link href={prevHref}>
          <Flex>
            <img src="/assets/arrow-left.svg" alt="" width="8" height="56" className="previousArrow" />
            <Flex direction="column" gap="0">
              <View className="next-prev__label">PREVIOUS</View>
              <View className="next-prev__title">{previous.title}</View>
            </Flex>
          </Flex>
        </Link>)}
      {next &&
        (<Link href={nextHref}>
          <Flex>
            <Flex direction="column" gap="0">
              <View className="next-prev__label">NEXT</View>
              <View className="next-prev__title">{next.title}</View>
            </Flex>
            <img src="/assets/arrow-right.svg" alt="" width="8" height="56" className="nextArrow" />
          </Flex>
        </Link>)}
    </Flex>
  );
}

export const NEXT_PREVIOUS_SECTIONS = [
  '/start/getting-started/'
]
