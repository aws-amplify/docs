import { Flex } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconCheck } from '@/components/Icons';
import { PLATFORM_VERSIONS } from '@/data/platforms';
import classNames from 'classnames';
import { trackVersionChange } from '@/utils/track';
import { useVersionSwitcherPath } from './useVersionSwitcherPath';
import { BUILD_A_BACKEND, PREV_BUILD_A_BACKEND } from '@/data/routes';

export const VersionSwitcher = ({ platform, isPrev, ...rest }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const versions = PLATFORM_VERSIONS[platform];
  const switchPath = useVersionSwitcherPath(platform);
  let path = isPrev ? BUILD_A_BACKEND : PREV_BUILD_A_BACKEND;
  if (
    switchPath &&
    (pathname.startsWith(BUILD_A_BACKEND) ||
      pathname.startsWith(PREV_BUILD_A_BACKEND))
  )
    path = switchPath;

  const inactiveHref = {
    pathname: path,
    query: {
      platform: platform
    }
  };

  const activeHref = {
    pathname: pathname,
    query: {
      platform: platform
    }
  };

  const fireTrackEvent = (prevVersion: boolean) => {
    if (prevVersion !== isPrev) {
      trackVersionChange(prevVersion);
    }
  };

  return (
    <Flex className="version-switcher" {...rest}>
      <Link
        href={isPrev ? activeHref : inactiveHref}
        onClick={() => fireTrackEvent(true)}
        className={classNames('version-switcher__link', { active: isPrev })}
      >
        {isPrev && <IconCheck fontSize="xs" />}
        {versions.prev}
      </Link>
      <Link
        href={!isPrev ? activeHref : inactiveHref}
        className={classNames('version-switcher__link', { active: !isPrev })}
        onClick={() => fireTrackEvent(false)}
      >
        {!isPrev && <IconCheck fontSize="xs" />}
        {versions.current}
      </Link>
    </Flex>
  );
};
