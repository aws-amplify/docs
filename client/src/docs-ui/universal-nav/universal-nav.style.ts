import {css} from "emotion";

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
  height: 4.5rem;
  width: 100%;
  transition: 0.25s ease all;
  padding: 0 0rem 0 1.5rem;
  overflow-x: auto;

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
  > a {
    display: flex;
    flex-direction: row;
    align-items: center;

    > img {
      height: 1.25rem;
      margin-right: 0.125rem;
    }

    > span {
      margin-left: 0.25rem;
      font-size: 1.25rem;
    }
  }
`;

export const linksStyle = css`
  display: flex;
  flex-direction: row;
  padding-right: 1.5rem;

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
