import { Host, Container } from '../../styles/link-button-styles';
import ExternalLink from '../ExternalLink';

export default function ExternalLinkButton({ href, children }) {
  return (
    <Host>
      <ExternalLink href={href}>
        <Container>{children}</Container>
      </ExternalLink>
    </Host>
  );
}
