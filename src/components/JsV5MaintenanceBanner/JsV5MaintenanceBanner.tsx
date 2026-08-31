import Link from 'next/link';
import { Platform } from '@/data/platforms';

/**
 * Builds the route to the v5 -> v6 migration guide for a given platform.
 *
 * The guide is a `[platform]` route served by this app and its content is
 * filtered per platform, so linking within the reader's current platform keeps
 * their platform/nav context intact.
 */
export const getMigrationGuideUrl = (platform: Platform) =>
  `/gen1/${platform}/build-a-backend/troubleshooting/migrate-from-javascript-v5-to-v6/`;

interface JsV5MaintenanceBannerProps {
  currentPlatform: Platform;
}

export const JsV5MaintenanceBanner = ({
  currentPlatform
}: JsV5MaintenanceBannerProps) => {
  return (
    <div className="js-v5-banner">
      <span className="js-v5-banner__badge">JavaScript v5</span>
      <span className="js-v5-banner__text">
        Amplify JavaScript v5 has entered maintenance mode. We recommend
        upgrading to v6. A{' '}
        <Link
          href={getMigrationGuideUrl(currentPlatform)}
          className="js-v5-banner__link"
        >
          migration guide
        </Link>{' '}
        is available to help you upgrade from v5 to v6.
      </span>
    </div>
  );
};
