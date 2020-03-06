import {css} from "emotion";

export const secondaryNavStyle = css`
  overflow-x: auto;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding: 0 0 0 1.5rem;

    * {
      white-space: nowrap;
    }

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      box-sizing: content-box;

      > docs-internal-link,
      > amplify-external-link {
        margin-left: 1.75rem;

        &:nth-child(1) {
          margin-left: 0;
        }

        a {
          display: block;
          padding: 0.875rem 0 0.875rem;
          color: var(--font-color);
        }

        &:first-child a {
          margin-left: 0;
        }
      }
    }
  }
`;

export const spanStyle = css`
  color: var(--font-color-secondary);
`;

export const linkActiveStyle = css`
  > a {
    font-weight: bold;
    border-bottom: 0.125rem solid var(--font-color);
    > span {
      color: var(--font-color);
    }
  }
`;

export const hostStyle = css`
  z-index: 1;
  display: block;
  position: sticky;
  top: 0;
  background-color: var(--bg-color-secondary);
`;

export const searchStyle = css`
  padding: 0 1rem;
  margin-left: 0.5rem;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    input {
      position: relative;
      display: flex;
      flex: 1;
      width: 100%;
      height: 2rem;
      border-radius: 0.25rem;
      padding: 0 1.75rem 0 0.75rem;
      min-width: 15rem;
    }

    img {
      position: absolute;
      right: 0.5rem;
      width: 0.75rem;
      opacity: 0.5;
    }
  }
`;
