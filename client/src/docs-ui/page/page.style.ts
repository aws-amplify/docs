import {css} from "emotion";
import {MAX_WIDTH} from "../../amplify-ui/styles/media";

export const sidebarLayoutDivStyle = css`
  display: flex;
  flex-direction: row;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  background-color: var(--bg-color);
`;

export const sidebarLayoutStyle = css`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color-tertiary);

  h1 {
    margin-top: 0.375rem;
  }

  p {
    margin-bottom: 1rem;

    &.searchable-code {
      display: none;
    }
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

export const sidebarHeaderStyle = css`
  display: flex;
  flex-direction: row;
  margin: 1.75rem 2.75rem 0 2.5rem;
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
  > div {
    position: relative;
    height: 100%;

    > amplify-toc {
      position: sticky;
      top: 3rem;
      flex-direction: column;
      max-height: 100vh;
      overflow-y: auto;

      > div {
        padding-bottom: 3rem;
      }
    }
  }
`;
