import Link from 'next/link';

export const Gen1Banner = ({ currentPlatform }) => {
  return (
    <div className="gen1-page-banner">
      <span className="gen1-page-banner__badge">Legacy</span>
      <span className="gen1-page-banner__text">
        You are viewing Gen 1 documentation.{' '}
        <Link
          href={`/${currentPlatform}/start/quickstart`}
          className="gen1-page-banner__link"
        >
          Switch to the latest Gen 2 docs &rarr;
        </Link>
      </span>
    </div>
  );
};
