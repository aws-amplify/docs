import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { MQDesktop } from '../media';

const slideInMobile = keyframes`
  from {
    transform: translate(-50%, 90px);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const slideOutMobile = keyframes`
  from {
    transform: translate(-50%, 0);
  }
  to {
    transform: translate(-50%, 90px);
  }
`;

const slideOver = keyframes`
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(-46px);
    opacity: 1;
  }
`;

const slideInDesktop = keyframes`
  from {
    bottom: -50px;
  }
  to {
    bottom: 32px;
  }
`;

const slideOutDesktop = keyframes`
  from {
    bottom: 32px;
  }
  to {
    bottom: -50px;
  }
`;

const expand = keyframes`
  from {
    overflow: hidden;
  }
  to {
    overflow: visible;
    max-height: 250px;
  }
`;

const collapse = keyframes`
  from {
    overflow: visible;
    max-height: 250px;
  }
  to {
    overflow: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const FeedbackContainer = styled.div`
  margin: 12px 0;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.up {
      opacity: 0;
      animation: ${slideOver} 0.4s ease-in-out;
      animation-fill-mode: forwards;
    }
  }
`;

export const FeedbackText = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  a {
    color: var(--secondary-color);

    span {
      padding: 0;
    }
  }
`;

export const VoteButton = styled.a`
  display: flex;
  flex-direction: row;
  border: 1px solid #232f3e;
  border-radius: 6px;
  padding: 5px 12px;
  justify-content: space-between;
  align-items: center;
  margin-left: 12px;
  &:hover {
    cursor: pointer;
    background: rgba(0, 7, 22, 0.05);
    text-decoration: none;
  }
  span {
    padding: 0;
    height: 16px;
    margin-right: 12px;
  }
`;

export const ButtonStyles = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  a {
    background: none;
    cursor: pointer;
    color: #414d5c;
    border-color: #414d5c;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    border-radius: 20px;
    border: 2px solid;
    padding: 4px 20px;
    span {
      cursor: pointer;
    }
    &:hover {
      border-color: #000716;
      color: #000716;
      background: rgba(0, 7, 22, 0.05);
      text-decoration: none;
    }
  }
`;
