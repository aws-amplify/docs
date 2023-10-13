import { useState } from 'react';
import { Button, Link } from '@aws-amplify/ui-react';
import { MenuChevron } from '../Icons';

const platformList = [
  { title: 'Android', link: '/android' },
  { title: 'Angular', link: '/angular' },
  { title: 'Flutter', link: '/flutter' },
  { title: 'Javascript', link: '/javascript' },
  { title: 'Next.js', link: '/next' },
  { title: 'React', link: '/react' },
  { title: 'React Native', link: '/react-native' },
  { title: 'Swift', link: '/swift' },
  { title: 'Vue', link: '/vue' }
];

export function PlatformNavigator({ currentPlatform }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav aria-labelledby="platformBtn" className={`platform-navigator`}>
      Choose your framework:
      <Button
        className={`platform-navigator__button`}
        aria-expanded="false"
        id="platformBtn"
        aria-controls="platformNav"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {currentPlatform}
        <MenuChevron open={isOpen} />
      </Button>
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
            <Link
              href={platform.link}
              key={platform.title}
              aria-current={current}
              className={`platform-navigator__dropdown__link ${
                current ? 'platform-navigator__dropdown__link--current' : ''
              }`}
            >
              <li className={`platform-navigator__dropdown__item`}>
                {platform.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
