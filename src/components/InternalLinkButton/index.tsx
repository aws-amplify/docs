import InternLink from '../InternalLink';

export default function InternalLinkButton({ href, children }) {
  return <InternLink href={href}>{children}</InternLink>;
}
