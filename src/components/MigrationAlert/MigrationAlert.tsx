import { Callout } from '../Callout';
import Link from 'next/link';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

type MigrationAlert = {
  isLegacy: boolean;
  url: string;
};

export function MigrationAlert({ isLegacy, url }: MigrationAlert) {
  const currentPlatform = useCurrentPlatform();

  const alertText = isLegacy
    ? 'You are currently viewing the legacy GraphQL Transformer documentation.'
    : 'You are currently viewing the new GraphQL transformer v2 docs';

  const alertCTA = isLegacy
    ? 'View latest documentation'
    : 'Looking for legacy docs?';

  return (
    <Callout warning={true}>
      {alertText}{' '}
      <Link
        href={{
          pathname: url,
          query: { platform: currentPlatform }
        }}
      >
        {alertCTA}
      </Link>
    </Callout>
  );
}
