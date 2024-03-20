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
import { PLATFORMS, PLATFORM_DISPLAY_NAMES } from '@/data/platforms';

const gen1GetStartedHref =
  '/gen1/[platform]/start/getting-started/introduction/';

const gen2GetStartedHref = '/[platform]/start/quickstart/';

/**
 * Generates get started links for all platforms with the same get started url
 * @param getStartedPathname
 * @returns {GetStartedLinksType[]} The get started link objects to be used in GetStartedPopover component
 */
function generateGetStartedLinks(getStartedPathname): GetStartedLinksType[] {
  const getStartedItems: Partial<GetStartedLinksType>[] = PLATFORMS.map(
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

export const gen1GetStartedLinks = generateGetStartedLinks(gen1GetStartedHref);

export const gen2GetStartedLinks = generateGetStartedLinks(gen2GetStartedHref);
