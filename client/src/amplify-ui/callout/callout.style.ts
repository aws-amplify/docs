import {css} from "emotion";

export const hostStyle = css`
  display: block;
  padding-left: 0.75rem;

  > div {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.75);
  }
`;

export const styleByType = {
  info: css`
    background-color: var(--color-ink-hv);
  `,
  warning: css`
    background-color: var(--color-orange-hv);
  `,
};
