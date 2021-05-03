import Link from "next/link";
import {Host, Container} from "./styles";

export default function InternalLinkButton({href, children}) {
  return (
    <Host>
      <Container>
        <Link href={href}>
          <a>{children}</a>
        </Link>
      </Container>
    </Host>
  );
}
