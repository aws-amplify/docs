import { Callout } from '@/components/Callout';
import Link from 'next/link';
import classNames from 'classnames';

export const Gen1Banner = ({ currentPlatform }) => {
  return (
    <Callout backgroundColor="background.error">
      For new Amplify apps, we recommend using Amplify Gen 2. You can learn more
      in our{' '}
      <Link
        href={`/${currentPlatform}`}
        passHref
        className={classNames('amplify-link')}
      >
        Gen 2 Docs
      </Link>
      .
    </Callout>
  );
};
