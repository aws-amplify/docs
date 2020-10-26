import {css} from "emotion";

export const hostStyle = css`
  display: none;
  position: relative;
  margin-top: 0.5rem;

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    appearance: none;
    cursor: pointer;
    background-color: transparent;

    img {
      min-width: 0.75rem;
      min-height: 0.75rem;
    }
  }

  > amplify-external-link {
    display: flex;
    border-radius: 0.25rem;
    background-color: var(--color-ink-hv);

    a {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0.75rem 1rem;
      color: var(--color-white);
    }
  }
`;

export const displayStyle = css`
  display: block;
`;

export const arrowStyle = css`
  display: inline-block;
  height: 0.125rem;
  width: 0.125rem;
  border: solid white;
  border-width: 0 0.125rem 0.125rem 0;
  padding: 0.1875rem;
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export const arrowUpStyle = css`
  margin-top: 0.125rem;
  transform: rotate(-135deg);
`;

export const exStyle = css`
  margin: 0.125rem 0.125rem 0 0;
`;

export const calloutTextStyle = css`
  > i {
    margin-right: 0.875rem;
  }
  > .text {
    font-size: 0.875rem;
    font-weight: bold;
  }
`;
