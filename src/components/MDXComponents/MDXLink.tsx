import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';

export const MDXLink = (props) => {
  const { href, children } = props;
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  return isInternal ? (
    <Link href={href}>{children}</Link>
  ) : (
    <ExternalLink href={href}>{children}</ExternalLink>
  );
};
