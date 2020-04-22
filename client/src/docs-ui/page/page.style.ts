import {css} from "emotion";
import {MQLaptop} from "../../amplify-ui/styles/media";

export const sidebarLayoutStyle = css`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color-tertiary);

  h1 {
    margin-top: 0.375rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    h2,
    h3 {
      color: var(--font-color);
    }
  }

  amplify-toc-contents h4 {
    margin-bottom: 1rem;
  }

  amplify-sidebar-layout-toggle {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    background-color: var(--color-orange-hv);
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const mainStyle = css`
  a {
    &,
    &:h2,
    &:h3 {
      color: var(--font-color);
    }

    &:hover,
    & h2:hover,
    & h3:hover {
      text-decoration: underline;
    }
  }
`;

export const pageStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;

  ul {
    margin-bottom: 1rem;

    li + li {
      margin-top: 0.25rem;
    }
  }
`;

export const sectionHeaderStyle = css`
  line-height: normal;
  margin-bottom: 0;
  font-size: 1rem;
  text-transform: uppercase;
  color: var(--font-color-secondary);
  font-weight: bold;
`;

export const tocStyle = css`
  display: none;

  ${MQLaptop} {
    display: initial;
  }

  > div {
    position: relative;
    height: 100%;

    > amplify-toc {
      position: sticky;
      top: 3rem;
      display: flex;
      flex-direction: column;
      max-height: 100vh;
      overflow-y: auto;

      > div {
        padding-bottom: 3rem;
      }
    }
  }
`;

export const sidebarToggleClass = css`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .ex-graphic {
    display: none;
  }

  &.in-view {
    .burger-graphic {
      display: none;
    }
    .ex-graphic {
      display: initial;
    }
  }
`;
