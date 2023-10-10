import ExternalLink from '../ExternalLink';

export default function ExternalLinkButton({ href, children }) {
  return <ExternalLink href={href}>{children}</ExternalLink>;
}
