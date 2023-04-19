import styled from '@emotion/styled';
import { MQDesktop, MQLaptop, MQTablet, MQMobile } from '../media';

export const SecondaryNavStyle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;

  ${MQDesktop} {
    flex-direction: row;
    alignitems: flex-start;
  }

  * {
    white-space: nowrap;
  }

  .secondary-nav-links {
    padding: 0px 32px;
    padding-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;

    width: 100%;
    overflow-x: auto;

    display: flex;
    flex-direction: row;
    align-items: start;

    border-top: 1px solid #aab7b8;

    ${MQDesktop} {
      border-top: none;
    }

    a {
      margin-left: 1.75rem;

      &:first-child {
        margin-left: 0;
      }

      display: block;
      padding: 0.875rem 0 0.875rem;
      padding-bottom: 1.375rem;
      color: var(--font-color);
    }

    background: linear-gradient(
        to right,
        var(--bg-color-secondary) 25%,
        rgba(255, 255, 255, 0)
      ),
      linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        var(--bg-color-secondary) 75%
      ),
      linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
      linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));
    background-position: left center, right center, left center, right center;
    background-repeat: no-repeat;
    background-size: 80px 100%, 80px 100%, 30px 100%, 30px 100%;
    background-attachment: local, local, scroll, scroll;
  }
`;

export const HostStyle = styled.div`
  z-index: 1;
  display: block;
  position: sticky;
  top: var(--docs-dev-center-nav);
  background-color: var(--bg-color-secondary);
`;

export const LinkActiveStyle = styled.a`
  font-weight: bold;

  ${MQLaptop} {
    border-bottom: 2px solid var(--color-orange-hv);
  }

  > span {
    color: var(--font-color);
  }
`;

export const LinkInactiveStyle = styled.a``;

export const SearchBarContainer = styled.div`
  margin: 12px 0px;
  width: 100%;
  padding: 0px 32px;

  ${MQDesktop} {
    width: 850px;
  }
`;
