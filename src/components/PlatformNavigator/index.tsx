import { useState } from 'react';
import { Button, Link, Flex, Image, View } from '@aws-amplify/ui-react';
import * as img from '../../constants/img';
import { IconChevron } from '@/components/Icons';

const platformList = [
  { title: 'Android', link: '/android', imgName: 'ANDROID' },
  { title: 'Angular', link: '/angular', imgName: 'ANGULAR' },
  { title: 'Flutter', link: '/flutter', imgName: 'FLUTTER' },
  { title: 'JavaScript', link: '/javascript', imgName: 'JS' },
  { title: 'Next.js', link: '/next', imgName: 'NEXT' },
  { title: 'React', link: '/react', imgName: 'REACT' },
  { title: 'React Native', link: '/react-native', imgName: 'REACTNATIVE' },
  { title: 'Swift', link: '/swift', imgName: 'IOS' },
  { title: 'Vue', link: '/vue', imgName: 'VUE' }
];

export function PlatformNavigator({ currentPlatform }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const platformItem = platformList.filter((platform) => {
    return platform.title === currentPlatform;
  })[0];

  return (
    
    <>
    <nav aria-labelledby="platformBtn" className={`platform-navigator`}>
      Choose your framework:
      <Flex alignItems="center">
      <Button
        className={`platform-navigator__button`}
        aria-expanded="false"
        id="platformBtn"
        aria-controls="platformNav"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        isFullWidth={true}
      >
        <Flex as="span" alignItems="center">
          <Image
            alt=""
            aria-hidden="true"
            height={30}
            width={30}
            src={img[platformItem.imgName].src}
          />
          {currentPlatform}
        </Flex>
        <IconChevron className={isOpen ? '' : 'icon-rotate-90-reverse'} />
      </Button>
      <Link>Info</Link>
      </Flex>
      <ul
        id="platformNav"
        className={`platform-navigator__dropdown ${
          isOpen ? 'platform-navigator__dropdown--show' : ''
        }`}
        aria-expanded={isOpen}
      >
        {platformList.map((platform) => {
          const title = platform.title;
          const current = title === currentPlatform;
          return (
            <li className={`platform-navigator__dropdown__item`}>
              <Link
                href={platform.link}
                key={platform.title}
                aria-current={current}
                className={`platform-navigator__dropdown__link ${
                  current ? 'platform-navigator__dropdown__link--current' : ''
                }`}
              >
                <Flex as="span" alignItems="center">
                  <Image
                    alt=""
                    aria-hidden="true"
                    height={20}
                    width={20}
                    src={img[platform.imgName].src}
                  />
                  {platform.title}
                </Flex>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
    </>
  );
}