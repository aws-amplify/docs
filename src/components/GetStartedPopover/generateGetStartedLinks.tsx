import {
  IconAndroid,
  IconAngular,
  IconFlutter,
  IconJS,
  IconNext,
  IconReact,
  IconSwift,
  IconVue
} from '@/components/Icons';
import { GetStartedLinksType } from './GetStartedPopover';
import { PLATFORM_DISPLAY_NAMES, Platforms } from '@/data/platforms';

/**
 * Generates get started links for all platforms with the same get started url
 * @param getStartedPathname
 * @returns {GetStartedLinksType[]} The get started link objects to be used in GetStartedPopover component
 */
export function generateGetStartedLinks(
  getStartedPathname
): GetStartedLinksType[] {
  const platformOrder: Platforms = [
    'react',
    'nextjs',
    'angular',
    'vue',
    'javascript',
    'react-native',
    'flutter',
    'android',
    'swift'
  ];

  const getStartedItems: Partial<GetStartedLinksType>[] = platformOrder.map(
    (platform) => ({
      title: PLATFORM_DISPLAY_NAMES[platform],
      platform: platform
    })
  );

  for (const item of getStartedItems) {
    switch (item.title) {
      case 'React':
        item['icon'] = <IconReact />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'JavaScript':
        item['icon'] = <IconJS />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'Flutter':
        item['icon'] = <IconFlutter />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'Swift':
        item['icon'] = <IconSwift />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'Android':
        item['icon'] = <IconAndroid />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'React Native':
        item['icon'] = <IconReact />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'Angular':
        item['icon'] = <IconAngular />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'Next.js':
        item['icon'] = <IconNext />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
      case 'Vue':
        item['icon'] = <IconVue />;
        item['href'] = {
          pathname: getStartedPathname,
          query: {
            platform: item.platform as string
          }
        };
        break;
    }
  }

  return getStartedItems as GetStartedLinksType[];
}
