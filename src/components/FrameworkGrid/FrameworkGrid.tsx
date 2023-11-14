import Link from 'next/link';
import { Grid, View } from '@aws-amplify/ui-react';
import { Platform } from '@/data/platforms';
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

const frameworks = [
  {
    title: 'React',
    key: 'react',
    href: '/react',
    icon: <IconReact />
  },
  {
    title: 'JavaScript',
    key: 'javascript',
    href: '/javascript',
    icon: <IconJS />
  },
  {
    title: 'Flutter',
    key: 'flutter',
    href: '/flutter',
    icon: <IconFlutter />
  },
  {
    title: 'Swift',
    key: 'swift',
    href: '/swift',
    icon: <IconSwift />
  },
  {
    title: 'Android',
    key: 'android',
    href: '/android',
    icon: <IconAndroid />
  },
  {
    title: 'React Native',
    key: 'react-native',
    href: '/react-native',
    icon: <IconReact />
  },
  {
    title: 'Angular',
    key: 'angular',
    href: '/angular',
    icon: <IconAngular />
  },
  {
    title: 'Next.js',
    key: 'nextjs',
    href: '/nextjs',
    icon: <IconNext />
  },
  {
    title: 'Vue',
    key: 'vue',
    href: '/vue',
    icon: <IconVue />
  }
];

interface FrameworkGridProps {
  currentKey?: Platform;
}

export const FrameworkGrid = ({ currentKey }: FrameworkGridProps) => {
  return (
    <View
      as="nav"
      className="framework-grid-wrapper"
      aria-label="Choose a language or framework"
    >
      <Grid as="ul" className="framework-grid">
        {frameworks.map((framework) => {
          const { title, key, href, icon } = framework;
          const isCurrent = key === currentKey;
          return (
            <li key={key} className="framework-grid__item">
              <Link
                href={href}
                className={`framework-grid__link${
                  isCurrent ? ' framework-grid__link--current' : ''
                }`}
              >
                <View className="framework-grid__icon">{icon}</View>
                {title}
              </Link>
            </li>
          );
        })}
      </Grid>
    </View>
  );
};
