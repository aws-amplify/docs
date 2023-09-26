import { Host, Container } from '../../styles/link-button-styles';
import InternLink from '../InternalLink';

export default function InternalLinkButton({ href, children }) {
  return (
    <Host>
      <InternLink href={href}>
        <Container>{children}</Container>
      </InternLink>
    </Host>
  );
}
