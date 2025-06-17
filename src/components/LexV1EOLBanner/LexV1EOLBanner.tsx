import { Callout } from '@/components/Callout';
import Link from 'next/link';
import classNames from 'classnames';

export const LexV1EOLBanner = () => {
  return (
    <Callout backgroundColor="background.error">
      <Link
        href="https://docs.aws.amazon.com/lex/latest/dg/migrate.html"
        passHref
        className={classNames('amplify-link')}
      >
        AWS will end support for Amazon Lex V1 on September 15, 2025,
      </Link>
      , and is no longer accepting any new users as of March 31. The guidance is
      to migrate to{' '}
      <Link
        href="https://docs.aws.amazon.com/lexv2/latest/dg/getting-started.html"
        passHref
        className={classNames('amplify-link')}
      >
        Amazon Lex V2.
      </Link>{' '}
    </Callout>
  );
};
