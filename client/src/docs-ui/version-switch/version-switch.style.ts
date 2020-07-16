import {css} from "emotion";

export const activeSwitchStyle = css`
  a {
    background-color: var(--primary-color);
  }
  a > span {
    color: var(--font-color-contrast);
    font-weight: 600;
  }
`;

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
    align-items: stretch;
    text-align: center;

    stencil-route-link {
      &,
      & > a {
        color: var(--font-color);
        display: flex;
        flex: 1;
        text-align: center;
        justify-content: center;
      }

      > a {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        border-radius: 0.25rem;
        line-height: 1.25rem;

        &:hover {
          opacity: 0.9;
        }

        .subtitle {
          font-size: 0.875rem;
        }
      }
    }
  }
`;
