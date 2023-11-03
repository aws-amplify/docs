import { Flex } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import flatDirectory from 'src/directory/flatDirectory.json';
import { IconCheck } from '@/components/Icons';
import { PLATFORM_VERSIONS } from '@/data/platforms';
import classNames from 'classnames';


const findRoute = (platform, isPrev) => {
    const router = useRouter();
    const path = router.pathname;
    const newRoute = isPrev ? path.replace('/[platform]/prev', '/[platform]') : path.replace('/[platform]', '/[platform]/prev');
    const pageNode = flatDirectory[newRoute];
    if (pageNode && pageNode.platforms && pageNode.platforms.includes(platform)) {
        return newRoute;
    }
}

export const VersionSwitcher = ({ platform, isPrev, ...rest }) => {
    const router = useRouter();
    const versions = PLATFORM_VERSIONS[platform];
    const switchPath = findRoute(platform, isPrev);
    let path = isPrev ? "/[platform]" : "/[platform]/prev";
    if (switchPath) path = switchPath;

    const inactiveHref = {
        pathname: path,
        query: {
            platform: platform
        }
    };

    const activeHref = {
        pathname: router.pathname,
        query: {
            platform: platform
        }
    }

    return <Flex className="version-switcher" {...rest}>
        <Link href={isPrev ? activeHref : inactiveHref} className={classNames("version-switcher__link", { "active": isPrev })}>
            {isPrev && <IconCheck fontSize="xl" />}
            {versions.prev}
        </Link>
        <Link href={!isPrev ? activeHref : inactiveHref} className={classNames("version-switcher__link", { "active": !isPrev })}>
            {!isPrev && <IconCheck fontSize="xl" />}
            {versions.current}
        </Link>
    </Flex>
}