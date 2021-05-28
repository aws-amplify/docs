import Link from "next/link";
import {Host, Container} from "./styles";

export default function InternalLinkButton({href, children}) {
  return (
    <Host>
      <Link href={href}>
        <Container>{children}</Container>
      </Link>
    </Host>
  );
}
