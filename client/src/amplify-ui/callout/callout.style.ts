import {css} from "emotion";

export const hostStyle = css`
  display: block;
  padding-left: 0.75rem;
  margin-bottom: 1rem;

  > div {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.75);
  }

  p {
    margin-bottom: 0;
    margin-top: 1rem;

    &:first-child {
      margin-top: 0;
    }
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
