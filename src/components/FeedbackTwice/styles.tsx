import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { MQTablet, MQDesktop } from '../media';

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 100px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const slideOver = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(150%);
  }
`;

const expand = keyframes`
  from {
    height: 0;
    // transform: scale(0);
  }
  to {
    height: fit-content;
    // transform: scale(1);
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

export const FeedbackSticky = styled.div`
  position: fixed;
  bottom: 50px;
  border: 2px solid #d1d5db;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  min-width: 264px;
  right: 26%;
  height: 46px;
  background: #ffffff;
  animation: ${slideIn} .5s linear;
  }
`;

export const ThankYouResponse = styled.div`
  position: fixed;
  bottom: 50px;
  border: 2px solid #d1d5db;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  min-width: 264px;
  right: 26%;
  height: 46px;
  background: #f2fcf3;
  animation: ${fadeOut} .5s linear 2s;
  animation-fill-mode: forwards;
  }
`;

export const LeaveGitHubResponse = styled.div`
  position: fixed;
  bottom: 50px;
  border: 2px solid #d1d5db;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  min-width: 264px;
  right: 26%;
  background: #FFF7F7;
  height: 46px;
  overflow: hidden;
  animation: ${expand} 0.5s linear 1s;
  animation-fill-mode: forwards;
  }
`;

export const InitialLoad = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SecondaryLoad = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FeedbackText = styled.p`
  font-weight: bold;
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VoteButton = styled.a`
  padding: 5px !important;
  border-left: none !important;

  &:hover {
    cursor: pointer;
    background: none !important;
  }
`;

export const VoteIcon = styled.span`
  padding: 5px !important;
  border-left: none !important;
  animation: ${slideOver} 0.5s ease-in-out 0.25s;
  animation-fill-mode: forwards;
  &:nth-of-type(2) {
    visibility: hidden;
  }
`;

export const Divider = styled.div`
  width: 2px;
  height: 20px;
  left: 32px;
  background: #e9ebed;
  align-self: center;
  margin: 0 5px;
`;
export const Divider2 = styled.div`
  width: 2px;
  height: 20px;
  left: 32px;
  background: none;
  align-self: center;
  margin: 0 5px;
`;

export const Toggle = styled.div`
  background-color: var(--color-orange-hv);
  width: 3.5rem;
  height: 3.5rem;
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 50%;
  cursor: pointer;

  img {
    filter: brightness(0) invert(1);
    height: 1.7rem;
    width: auto;
  }

  ${MQDesktop} {
    display: none;
  }

  ${MQTablet} {
    right: 1rem;
    bottom: 0.5rem;
  }
`;

export const ThankYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0px 10px 5px 10px;
  text-align: center;
  height: 60px;
`;

export const FeedbackMobileContainer = styled.div`
  width: 300px;
  position: fixed;
  right: 1rem;
  bottom: 9rem;
  z-index: 1;

  ${MQTablet} {
    right: 1rem;
    bottom: 5rem;
  }
`;
