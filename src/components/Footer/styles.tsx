import styled from '@emotion/styled';
import { MQLaptop } from '../media';

export const Footer = styled.footer`
  padding: 4rem 2rem;
  text-align: center;
  color: var(--color-white);
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  ${MQLaptop} {
    flex-direction: row;
  }
`;

export const LeftFooter = styled.div`
  display: flex;
  flex-direction: column;
  color: #9ba7b6;
  align-self: center;
  padding-top: 25px;
  p {
    margin: 20px 0;
  }
  
  img {
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
  }
  h3 {
    margin-top: 0;
    font-size: 21px;
    font-weight: 300;
    > span {
      font-weight: 700;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    a {
      white-space: nowrap;
      color: var(--color-white);
    }
  }
  ${MQLaptop} {
    flex-direction: row;
    align-self: unset;
    padding-top: 0;
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

export const FooterHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
`;

export const RightFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid #414d5c;
  div {
    text-align: left;
    margin: 6px 0;
  }
  ${MQLaptop} {
    margin-top: 0;
    align-items: flex-start;
    padding-bottom: 0;
    border: none;
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
  text-align: center;
  font-size: 0.75rem;
  line-height: 1.125rem;

  ${MQLaptop} {
    text-align: left;
  }
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
