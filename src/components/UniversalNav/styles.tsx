import styled from '@emotion/styled';
import { MQTablet, MQLaptop } from '../media';

export const Header = styled.div`
  display: block;
  background-color: var(--bg-color);
`;

export const NavContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  padding: 1.5rem;
  background-color: transparent;

  ${MQLaptop} {
    grid-template-columns: 1fr 700px 1fr;
  }
`;

export const SearchContainer = styled.div`
  grid-column-start: 1;
  width: 100%;
  flex: auto;
  padding-top: var(--docs-dev-center-nav);

  @media (min-width: 975px) {
    padding: 0px;
  }

  ${MQTablet} {
    flex: 1 15rem;
    order: 2;
    margin: 0;
  }

  ${MQLaptop} {
    grid-column-start: 2;
  }
`;
