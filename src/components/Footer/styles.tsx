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

  a,
  a:link,
  a:visited,
  a:hover,
  a:focus,
  a:active {
    color: var(--color-anchor);
  }
`;

export const Legal = styled.div`
  max-width: 24rem;

  img {
    height: 0.5rem;
    display: inline-block;
    margin-right: 0.25rem;
  }

  display: flex;
  flex-direction: row;
  text-align: right;
  font-size: 0.75rem;
  line-height: 1.125rem;
`;

export const Social = styled.div`
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
