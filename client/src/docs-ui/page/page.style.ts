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

  amplify-sidebar-layout-toggle {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    background-color: var(--color-blue-hv);
    border-radius: 50%;

    img {
      width: 1.75rem;
      height: 1.75rem;
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
    }
  }
`;

export const sidebarToggleClass = css`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &.in-view {
    display: none;
  }
`;
