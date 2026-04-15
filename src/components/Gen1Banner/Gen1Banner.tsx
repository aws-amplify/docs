import Link from 'next/link';

export const Gen1Banner = ({ currentPlatform }) => {
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
        and will reach end of life on May 1, 2027. New project should use{' '}
        <Link
          href={`/${currentPlatform}/`}
          className="gen1-page-banner__link"
        >
          Amplify Gen 2
        </Link>
        . For existing Gen 1 projects, a{' '}
        <Link
          href={`/${currentPlatform}/start/migrate-to-gen2/`}
          className="gen1-page-banner__link"
        >
          migration guide and tooling
        </Link>{' '}
        are available to help you upgrade.{' '}
        <Link
          href={`/${currentPlatform}/`}
          className="gen1-page-banner__link"
        >
          Switch to the latest Gen 2 docs →
        </Link>
      </span>
    </div>
  );
};
