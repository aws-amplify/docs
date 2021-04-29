import { Container } from "./styles";

export default function DocsContainer({ backgroundColor, children }) {
  return <Container backgroundColor={backgroundColor}>{children}</Container>;
}
