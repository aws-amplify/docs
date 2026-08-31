import Link from 'next/link';

export const MIGRATION_GUIDE_URL =
  'https://docs.amplify.aws/gen1/javascript/build-a-backend/troubleshooting/migrate-from-javascript-v5-to-v6/';

export const JsV5MaintenanceBanner = () => {
  return (
    <div className="js-v5-banner">
      <span className="js-v5-banner__badge">Maintenance Mode</span>
      <span className="js-v5-banner__text">
        Amplify JavaScript v5 has entered maintenance mode. We recommend
        upgrading to v6. A{' '}
        <Link href={MIGRATION_GUIDE_URL} className="js-v5-banner__link">
          migration guide
        </Link>{' '}
        is available to help you upgrade from v5 to v6.
      </span>
    </div>
  );
};
