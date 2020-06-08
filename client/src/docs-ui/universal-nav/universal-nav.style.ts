import {css} from "emotion";
import {MQFablet, MQTablet, MQLaptop} from "../../amplify-ui/styles/media";

export const universalNavStyle = css`
  display: block;
  background-color: var(--bg-color);
`;

export const universalNavContentStyle = css`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: 0.25s ease all;
  padding: 1.5rem;
  flex-wrap: wrap;

  > * {
    flex: 1;
  }

  span {
    color: var(--color-white);
    white-space: nowrap;
  }

  &.blend {
    background-color: transparent;

    * {
      color: var(--font-color);
    }

    stencil-route-link > a > span {
      color: var(--color-orange-hv);
    }
  }
`;

export const brandStyle = css`
  order: 1;
  width: 50%;

  ${MQTablet} {
    margin-right: 3rem;
  }

  > a {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      height: 1rem;
      margin-right: 0.125rem;

      ${MQTablet} {
        height: 1.25rem;
      }
    }

    > span {
      margin-left: 0.25rem;
      font-size: 1rem;

      ${MQTablet} {
        font-size: 1.25rem;
      }
    }

    > sup {
      position: relative;
      top: -0.25rem;
      margin-left: 0.125rem;
      font-size: 0.5rem;
      font-weight: bold;
      color: var(--color-white);
    }
  }
`;

export const searchStyle = css`
  width: 100%;
  order: 3;
  margin-top: 1.5rem;
  flex: auto;
  ${MQTablet} {
    flex: 1 15rem;
    order: 2;
    margin: 0;
  }
`;

export const linksStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  order: 2;
  width: 50%;

  ${MQTablet} {
    margin-left: 3rem;
    order: 3;
  }

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    font-size: 0.875rem;

    &:last-child {
      padding-right: 0;
    }
  }
`;

export const hideAboutLinkStyle = css`
  display: none;

  ${MQFablet} {
    display: initial;
  }
`;
