import {css} from "emotion";
import {MQLaptop, MQTablet, MQMobile} from "../../amplify-ui/styles/media";

export const secondaryNavStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  align-items: center;

  ${MQLaptop} {
    flex-direction: row;
    padding-left: 1.5rem;
  }

  * {
    white-space: nowrap;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    &:first-child {
      width: 100%;
      overflow-x: auto;

      > div {
        display: flex;
        flex-direction: row;
        padding: 0 1rem;
      }
    }

    docs-internal-link,
    amplify-external-link {
      margin-left: 1.75rem;

      &:first-child {
        margin-left: 0;
      }

      a {
        display: block;
        padding: 0.875rem 0 0.875rem;
        color: var(--font-color);
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

    ${MQLaptop} {
      border-bottom: 0.125rem solid var(--font-color);
    }

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

  ${MQTablet} {
    padding: 0;
  }
`;

export const ghostItemStyle = css`
  display: block;
  width: 1rem;
  height: 100%;
`;

export const shadowStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 2rem;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.1875)
  );

  ${MQLaptop} {
    display: none;
  }
`;
