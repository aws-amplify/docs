import {
  Nav,
  NavContent,
  Branding,
  SearchContainer,
  Links,
  AboutInternalAmplifyLink,
} from "./styles";
import {Container} from "../Container";
import SearchBar from "../SearchBar";
import ExternalLink from "../ExternalLink";

import Link from "next/link";
import {COMMUNITY, MARKETING} from "../../constants/links";

export default function UniversalNav({heading, brandIcon}) {
  return (
    <Nav>
      <Container backgroundColor="orange-hv">
        <NavContent>
          <Branding>
            <Link href="/">
              <a>
                <img src={brandIcon} />
                <span>{heading}</span>
              </a>
            </Link>
          </Branding>

          <SearchContainer>
            <SearchBar />
          </SearchContainer>

          <Links>
            <ExternalLink href={COMMUNITY}>
              <span>Community</span>
            </ExternalLink>

            <ExternalLink href={MARKETING} graphic="white">
              <span>
                About
                <AboutInternalAmplifyLink>Amplify</AboutInternalAmplifyLink>
              </span>
            </ExternalLink>
          </Links>
        </NavContent>
      </Container>
    </Nav>
  );
}
