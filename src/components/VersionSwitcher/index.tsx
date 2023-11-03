import { View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import flatDirectory from 'src/directory/flatDirectory.json';


const findRoute = (platform, isPrev) => {
    const router = useRouter();
    const path = router.pathname;
    const newRoute = isPrev ? path.replace('/[platform]/prev', '/[platform]') : path.replace('/[platform]', '/[platform]/prev');
    const pageNode = flatDirectory[newRoute];
    if (pageNode && pageNode.platforms && pageNode.platforms.includes(platform)) {
        return newRoute;
    }
}

export const VersionSwitcher = ({ platform, isPrev }) => {

    const switchPath = findRoute(platform, isPrev);
    const text = isPrev ? "Switch to current documentation" : "View previous documentation";
    let path = isPrev ? "/[platform]" : "/[platform]/prev";
    if (switchPath) path = switchPath;

    const href = {
        pathname: path,
        query: {
            platform: platform
        }
    };

    return <View paddingTop="small">
        <Link href={href}>{text}</Link>
    </View>
}