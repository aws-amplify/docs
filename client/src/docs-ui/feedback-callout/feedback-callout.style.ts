import {css} from "emotion";

export const hostStyle = css`
  display: none;
  position: relative;

  button {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
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
      padding: 1rem;
      color: var(--color-white);
    }
  }
`;

export const displayStyle = css`
  display: block;
`;
