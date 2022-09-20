import styled from "@emotion/styled";
import {MQFablet, MQTablet} from "../media";

type NavProps = {
  blend?: boolean;
};

export const Nav = styled.nav`
  display: block;
  background-color: var(--bg-color);
`;

export const NavContent = styled.div<NavProps>(({blend}) => {
  if (blend) {
    return `
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    transition: 0.25s ease all;
    padding: 1.5rem;
    flex-wrap: wrap;
    background-color: transparent;
  
    > * {
      flex: 1;
    }
  
    span {
      color: var(--color-white);
      white-space: nowrap;
    }

    * {
      color: var(--font-color);
    }

    a > span {
      color: var(--color-orange-hv);
    }
  `;
  }

  return `
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: 0.25s ease all;
  padding: 1.5rem;
  flex-wrap: wrap;

  > * {
    flex: 1;
  }

  span {
    color: var(--color-white);
    white-space: nowrap;
  }
`;
});

export const Branding = styled.div`
  order: 1;
  width: 50%;

  ${MQTablet} {
    margin-right: 3rem;
  }

  > a {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      height: 1rem;
      margin-right: 0.125rem;

      ${MQTablet} {
        height: 1.25rem;
      }
    }

    > span {
      margin-left: 0.25rem;
      font-size: 1rem;

      ${MQTablet} {
        font-size: 1.25rem;
      }
    }

    > sup {
      position: relative;
      top: -0.25rem;
      margin-left: 0.125rem;
      font-size: 0.5rem;
      font-weight: bold;
      color: var(--color-white);
    }
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  order: 3;
  margin-top: 1.5rem;
  flex: auto;
  ${MQTablet} {
    flex: 1 15rem;
    order: 2;
    margin: 0;
  }
`;

export const Links = styled.div<NavProps>(
  ({blend}) => `
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  order: 2;
  width: 50%;

  ${MQTablet} {
    margin-left: 3rem;
    order: 3;
  }

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    font-size: 0.875rem;
    padding-right: 0;

    ${blend &&
      `
    span {
      color: var(--font-color);
    }
    `}
  }
`,
);

export const AboutInternalAmplifyLink = styled.span`
  display: none;

  ${MQFablet} {
    display: initial;
  }
`;
