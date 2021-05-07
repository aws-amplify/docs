import styled from "@emotion/styled";
import {MQLaptop} from "../media";

export const Footer = styled.footer`
  padding: 4rem 2rem;
  text-align: center;
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${MQLaptop} {
    flex-direction: row;
  }
`;

export const LeftFooter = styled.div`
  display: flex;
  flex-direction: row;

  img {
    margin-right: 2rem;
    width: 2rem;
    height: 2rem;
  }

  h3 {
    margin-top: 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
    align-items: flex-start;

    a {
      white-space: nowrap;
      color: var(--color-white);
    }
  }
`;

export const RightFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 3rem;

  ${MQLaptop} {
    margin-top: 0;
  }
`;

export const Legal = styled.div`
  display: flex;
  flex-direction: row;

  a {
    margin-left: 0.75rem;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const Social = styled.div`
  display: flex;
  flex-direction: row;

  amplify-external-link {
    margin-left: 0.75rem;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
