import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';
import { useMDXLinkHref } from './utils/useMDXLinkHref';

export const MDXLink = ({ href, children, hash }) => {
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

  const nextLinkHref = useMDXLinkHref(href, hash);

  return isInternal ? (
    <Link href={nextLinkHref}>{children}</Link>
  ) : (
    <ExternalLink href={href}>{children}</ExternalLink>
  );
};
