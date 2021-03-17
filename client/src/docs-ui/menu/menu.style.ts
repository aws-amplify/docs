import {css} from "emotion";

export const menuStyle = css`
  display: block;
  padding: 0 2.5rem;
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
  margin-top: 2rem;

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

export const discordLinkStyle = css`
  > a {
    display: flex;
    background-color: var(--color-discord-blue);
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
    padding: 0.675rem 1rem;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }

  a {
    display: flex;
    color: var(--color-white);
    font-weight: 700;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.25rem;
  }
`;
