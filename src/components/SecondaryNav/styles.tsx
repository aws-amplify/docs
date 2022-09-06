import styled from '@emotion/styled';
import { MQLaptop, MQTablet } from '../media';

export const SecondaryNavStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;

  * {
    white-space: nowrap;
  }

  .secondary-nav-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    width: 100%;
    overflow-x: auto;

    display: flex;
    flex-direction: row;
    align-items: start;

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
`;

export const HostStyle = styled.div`
  z-index: 1;
  display: block;
  position: sticky;
  top: var(--docs-dev-center-nav);
  background-color: var(--bg-color-secondary);
  padding: 0 20px;
`;

export const LinkActiveStyle = styled.a`
  font-weight: bold;

  ${MQLaptop} {
    border-bottom: 0.125rem solid var(--color-orange-hv);
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
  height: 52px;

  ${MQTablet} {
    display: none !important;
  }
`;

export const SearchBarContainer = styled.div`
  // border: 1px solid red;
  margin: 10px 0px;
`;
