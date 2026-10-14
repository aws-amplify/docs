import { Callout } from '@/components/Callout';
import Link from 'next/link';
import classNames from 'classnames';

/**
 * Shared preview notice for features that have not reached general
 * availability. Rendered from one place so a feature's pages stay in sync and
 * the notice can be removed in one change at GA.
 */
export const PreviewBanner = () => {
  return (
    <Callout info>
      <strong>This feature is in preview.</strong> It is not recommended for
      production workloads yet, and APIs may change before general availability.
      Share feedback or report issues on{' '}
      <Link
        href="https://github.com/aws-amplify/amplify-backend/issues"
        passHref
        className={classNames('amplify-link')}
      >
        GitHub
      </Link>
      .
    </Callout>
  );
};
