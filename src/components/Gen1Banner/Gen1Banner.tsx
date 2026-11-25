import Link from 'next/link';
import { Platform } from '@/data/platforms';

export const Gen1Banner = ({
  currentPlatform
}: {
  currentPlatform: Platform;
}) => {
  return (
    <div className="gen1-page-banner">
      <span className="gen1-page-banner__badge">Maintenance Mode</span>
      <span className="gen1-page-banner__text">
        You are viewing Amplify Gen 1 documentation. Amplify Gen 1 has entered{' '}
        <Link
          href={`/reference/maintenance-policy/?platform=${currentPlatform}`}
          className="gen1-page-banner__link"
        >
          maintenance mode
        </Link>{' '}
        and will reach end of life on May 1, 2027. For existing Gen 1 projects,
        a{' '}
        <Link
          href={`/${currentPlatform}/start/migrate-to-gen2/`}
          className="gen1-page-banner__link"
        >
          migration guide and tooling
        </Link>{' '}
        are available to help you upgrade.
      </span>
    </div>
  );
};
