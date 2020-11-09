import {css} from "emotion";

export const selectAnchorStyle = css`
  position: relative;
  flex-grow: 2;

  display: block;
  user-select: none;

  stencil-route-link > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 0.75rem;
    border: 0.0625rem solid var(--border-color);
    color: var(--font-color);

    img {
      margin-right: 0.5rem;
      width: 1.75rem;
      height: 1.75rem;
    }

    &:hover {
      background-color: var(--bg-color-hover);
    }
  }
`;

export const currentlySelectedStyle = css`
  box-shadow: rgba(0, 0, 0, 0.09) 0.3125rem 0.3125rem 0 -0.0625rem;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:active {
    box-shadow: initial;
  }
`;

export const optionsStyle = css`
  visibility: hidden;
  position: absolute;
  background-color: var(--bg-color);
  box-shadow: rgba(0, 0, 0, 0.09) 0.3125rem 0.3125rem 0 -0.0625rem;
  width: 100%;
  z-index: 1;
  stencil-route-link > a {
    border: 0.0625rem solid var(--color-grey-md);
    border-top: 0;
  }
`;

export const showOptionsStyle = css`
  visibility: visible;
`;
