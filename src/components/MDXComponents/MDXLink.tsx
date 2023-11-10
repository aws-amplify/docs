import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

export const MDXLink = (props) => {
  const { href, children } = props;
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  const currentPlatform = useCurrentPlatform();
  const updatedHref = href.replace('%5Bplatform%5D', currentPlatform);
  return isInternal ? (
    <Link href={updatedHref}>{children}</Link>
  ) : (
    <ExternalLink href={href}>{children}</ExternalLink>
  );
};
