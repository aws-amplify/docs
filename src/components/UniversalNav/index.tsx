import {
  Nav,
  NavContent,
  Branding,
  SearchContainer,
  Links,
  AboutInternalAmplifyLink
} from './styles';
import { Container } from '../Container';
import SearchBar from '../SearchBar';
import ExternalLink from '../ExternalLink';

import Link from 'next/link';
import { CONTRIBUTE, MARKETING } from '../../constants/links';

export default function UniversalNav({ heading, brandIcon, blend }) {
  const backgroundColor = blend ? '' : 'color-orange-hv';
  return (
    <Nav>
      <Container backgroundColor={backgroundColor}>
        <NavContent blend={blend}>
          <Branding>
            <Link href="/">
              <a>
                <img alt="Amplify icon" src={brandIcon} />
                <span>{heading}</span>
              </a>
            </Link>
          </Branding>

          <SearchContainer>
            <SearchBar />
          </SearchContainer>

          <Links blend={blend}>
            <ExternalLink href={CONTRIBUTE}>
              <span>Contribute</span>
            </ExternalLink>

            <ExternalLink href={MARKETING} graphic={blend ? 'black' : 'white'}>
              <span>
                About{' '}
                <AboutInternalAmplifyLink>Amplify</AboutInternalAmplifyLink>
              </span>
            </ExternalLink>
          </Links>
        </NavContent>
      </Container>
    </Nav>
  );
}
