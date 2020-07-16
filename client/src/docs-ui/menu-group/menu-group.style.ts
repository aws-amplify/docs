import {css} from "emotion";

export const menuGroupHeaderStyle = css`
  width: 100%;
  text-align: initial;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  appearance: none;
  background-color: transparent;

  h4 {
    cursor: pointer;
  }

  &:hover {
    background-color: var(--bg-color-hover);
  }

  &:active {
    color: var(--font-color);
  }
`;

export const arrowStyle = css`
  border: solid black;
  border-width: 0 0.125rem 0.125rem 0;
  padding: 0.1875rem;
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export const arrowDownStyle = css`
  margin-bottom: 0.125rem;
  transform: rotate(45deg);
`;

export const arrowUpStyle = css`
  margin-top: 0.125rem;
  transform: rotate(-135deg);
`;

export const linksStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

export const menuGroupItemStyle = css`
  stencil-route-link,
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  a {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    color: var(--font-color-secondary);
    &:hover {
      background-color: var(--bg-color-hover);
    }
  }
`;

export const activeLinkStyle = css`
  background-color: var(--bg-color-hover);
`;
