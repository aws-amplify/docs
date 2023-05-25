import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { MQTablet, MQDesktop } from '../media';

const slideIn = keyframes`
  from {
    left: -100vw;
  }
  to {
    left: 0;
  }
`;

const slideOut = keyframes`
  from {
    left: 0;
  }
  to {
    left: -100vw;
  }
`;

type ToggleProps = {
  inView?: boolean;
};

export const TOCInnerStyle = styled.div`
  overflow: auto;
  padding-bottom: 3rem;
`;

export const TOCStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  font-size: 0.875rem;
  position: fixed;
  top: calc(var(--docs-dev-center-nav));
  z-index: 11;
  width: 100vw;
  height: 100%;
  background: white;
  align-self: flex-start;
  max-height: 100vh;
  padding: 0 2.5rem;
  left: -100vw;
  transition: left 0.4s;
  overflow: scroll;

  &.slideOut {
    animation: ${slideOut} 0.4s ease-in-out;
    animation-fill-mode: forwards;
  }
  &.slideIn {
    animation: ${slideIn} 0.4s ease-in-out;
    animation-fill-mode: forwards;
  }

  div.mobileHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    border-bottom: 2px solid #d1d5db;
    margin-bottom: 35px;

    h2 {
      font-family: 'Amazon Ember';
      font-style: normal;
      font-weight: 800;
      font-size: 16px;
      line-height: 20px;
      display: flex;
      align-items: center;
      letter-spacing: -0.0008em;
      margin: 0;
    }
  }

  ${MQTablet} {
    width: 16.875rem;
  }
  ${MQDesktop} {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 16.875rem;
    position: sticky;
    top: calc(3rem + var(--docs-dev-center-nav));
    padding: 2rem 0;
    z-index: 0;
    overflow: unset;
  }

  a {
    transition: 0.25s ease;
    transition-property: margin-left border;
    border-left: 0.05rem solid var(--border-color);
    display: flex;
    flex: 1;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-right: 1.5rem;
    color: var(--font-color);

    &:hover {
      background-color: var(--bg-color-hover);
    }

    &:first-child {
      margin-top: 0;
    }

    &.active {
      border-left-color: var(--color-anchor);
      color: var(--color-anchor);
    }
  }
`;

export const H2AnchorStyle = styled.div`
  a {
    padding-left: 1.5rem;
  }
`;

export const H3AnchorStyle = styled.div`
  a {
    padding-left: 2rem !important;
    font-size: 0.8125rem;
    line-height: 1.25rem;
  }
`;

export const HeaderStyle = styled.div`
  padding-right: 1.5rem;
  padding-bottom: 0.5rem;
  border-left: 0.05rem solid var(--border-color);

  ${MQDesktop} {
    padding-left: 1.5rem;
  }
`;
