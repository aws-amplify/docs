import React from 'react';
import dynamic from 'next/dynamic';
import { Header, NavContent, SearchContainer } from './styles';
import { Container } from '../Container';

// needed since SearchBar contains algolia code that is written for ESM. it will failed with "SyntaxError: Unexpected token 'export'" without this
const SearchBar = dynamic(() => import('../SearchBar'), { ssr: false });

export default function UniversalNav({ blend }) {
  const backgroundColor = blend ? '' : 'color-orange-hv';
  return (
    <Header>
      <Container backgroundColor={backgroundColor}>
        <NavContent>
          <SearchContainer>
            <SearchBar />
          </SearchContainer>
        </NavContent>
      </Container>
    </Header>
  );
}
