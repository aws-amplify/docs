import styled from "@emotion/styled";
import {MQLaptop} from "../media";

export const SecondaryNavStyle = styled.div`
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

  section div {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    &:first-child {
      width: 100%;
      overflow-x: auto;

      display: flex;
      flex-direction: row;
      padding: 0 1rem;
    }

    a {
      margin-left: 1.75rem;

      &:first-child {
        margin-left: 0;
      }

      display: block;
      padding: 0.875rem 0 0.875rem;
      color: var(--font-color);
    }
  }

  z-index: 1;
  display: block;
  position: sticky;
  top: 0;
  background-color: var(--bg-color-secondary);
`;

export const LinkActiveStyle = styled.a`
  font-weight: bold;

  ${MQLaptop} {
    border-bottom: 0.125rem solid var(--font-color);
  }

  > span {
    color: var(--font-color);
  }
`;

export const LinkInactiveStyle = styled.a``;

export const ShadowStyle = styled.div`
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
    display: none !important;
  }
`;
