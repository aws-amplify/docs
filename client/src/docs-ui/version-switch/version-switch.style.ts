import {css} from "emotion";

export const switchStyle = css`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
  border: 0.0625rem solid var(--border-color);

  docs-internal-link {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;

    stencil-route-link {
      &,
      & > a {
        display: flex;
        flex: 1;
        color: var(--font-color);
        text-align: center;
        justify-content: center;
      }

      > a {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: 0.25rem;
        border-radius: 0.25rem;
        line-height: 1.25rem;

        span {
          font-size: 0.875rem;
        }
      }
    }
  }
`;

export const activeSwitchStyle = css`
  a {
    background-color: var(--color-orange-lt);
    font-weight: 600;
  }
`;
