import {css} from "emotion";

export const menuStyle = css`
  display: block;
  padding: 0 2.5rem;
  overflow-y: auto;
  min-height: 100vh;
  padding-bottom: 3rem;
`;

export const menuItemContainerStyle = css`
  display: flex;
  flex-direction: column;
`;

export const menuBreakStyle = css`
  border-top: 0.0625rem solid var(--color-grey-lt);
  margin: 1.5rem -2.5rem 1.5rem -2.5rem;
`;

export const productRootLink = css`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  margin-top: 1.75rem;

  > stencil-route-link,
  > stencil-route-link > a {
    display: block;
    width: 100%;
  }

  > stencil-route-link > a {
    padding: 0.5rem;
  }

  &:hover {
    background-color: var(--bg-color-hover);
  }

  a {
    color: var(--color-dark-hv);
  }

  img {
    width: 1rem;
    margin-right: 0.5rem;
  }
`;

export const verticalGapStyle = css`
  width: 100%;
  height: 2rem;
`;

export const activeLinkStyle = css`
  background-color: var(--bg-color-hover);
`;
