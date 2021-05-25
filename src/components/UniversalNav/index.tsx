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

export default function UniversalNav({heading, brandIcon, blend}) {
  const backgroundColor = blend ? "" : "color-orange-hv";
  return (
    <Nav>
      <Container backgroundColor={backgroundColor}>
        <NavContent blend={blend}>
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

          <Links blend={blend}>
            <ExternalLink href={COMMUNITY}>
              <span>Community</span>
            </ExternalLink>

            <ExternalLink href={MARKETING} graphic={blend ? "black" : "white"}>
              <span>
                About{" "}
                <AboutInternalAmplifyLink>Amplify</AboutInternalAmplifyLink>
              </span>
            </ExternalLink>
          </Links>
        </NavContent>
      </Container>
    </Nav>
  );
}
