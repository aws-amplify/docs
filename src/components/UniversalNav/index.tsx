import { Header, NavContent, SearchContainer } from './styles';
import { Container } from '../Container';
import SearchBar from '../SearchBar';
import React from 'react';

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
