import styled from "@emotion/styled";
import {MQLaptop} from "../media";
import {InnerContainer, OuterContainer} from "../Container";

const Inner = styled(InnerContainer)`
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${MQLaptop} {
    flex-direction: row;
  }

  a {
    flex-direction: row;
    color: var(--font-color);
    padding: 1rem 0;
    border-radius: 0.25rem;
    display: flex;
    flex: 1 1 0%;
    position: relative;
    background-color: var(--color-white);
    justify-content: center;
    align-items: center;
    flex-direction: row;
    color: var(--font-color);
    border-radius: 0.25rem;

    :hover {
      box-shadow: 0 0.125rem 0.25rem var(--color-black);
    }

    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.5);

    &:hover {
      box-shadow: 0 0.125rem 0.25rem var(--color-black);
    }
  }
`;

export const Container = ({children, backgroundColor}) => (
  <OuterContainer backgroundColor={backgroundColor}>
    <Inner>{children}</Inner>
  </OuterContainer>
);

export const Logo = styled.img`
  max-height: 1.5rem;
  max-width: 1.5rem;
  margin-right: 0.5rem;
`;

export const ExternalLinkWrapper = styled.div`
  display: flex;
  flex: 1 1 0%;
  padding: 0.5rem;
  width: 100%;
`;
