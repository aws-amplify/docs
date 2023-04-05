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
    transform: translateX(100%);
  }
`;

const expand = keyframes`
  0% {
    overflow: hidden;
    // max-height: initial;
  }
  100% {
    overflow: visible;
    max-height: 250px;
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

export const VotePrompt = styled.div`
  position: fixed;
  bottom: 50px;
  border: 2px solid #d1d5db;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px 16px;
  gap: 8px;
  width: 90%;
  background: #ffffff;
  left: 0;
  transform: translate(calc(50vw - 50%));
  animation: ${slideIn} .5s linear;

    ${MQDesktop} {
      right: 26%;
      width: 280px;
      left: unset;
      transform: unset;
    }
  }
`;

export const YesVoteResponse = styled.div`
  position: fixed;
  bottom: 50px;
  border: 2px solid #d1d5db;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px 16px;
  gap: 8px;
  width: 90%;
  background: #f2fcf3;
  left: 0;
  transform: translate(calc(50vw - 50%));
  max-height: 46px;
  overflow: hidden;
  animation: ${expand} 0.5s linear;
  animation-fill-mode: forwards, forwards;
    ${MQDesktop} {
      right: 26%;
      width: 280px;
      left: unset;
      transform: unset;
    }
  }
`;

export const NoVoteResponse = styled.div`
  position: fixed;
  bottom: 50px;
  border: 2px solid #d1d5db;
  border-radius: 16px;
  padding: 12px 16px;
  width: 90%;
  max-height: 46px;
  background: #FFF7F7;
  left: 0;
  transform: translate(calc(50vw - 50%));
  overflow: hidden;
  animation: ${expand} 0.5s linear;
  animation-fill-mode: forwards;
    ${MQDesktop} {
      right: 26%;
      width: 280px;
      left: unset;
      transform: unset;
    }
  }
`;

export const InitialLoad = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 2px solid #e9ebed;
`;

export const SecondaryLoad = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const FeedbackText = styled.p`
  margin-right: 12px;
  font-weight: bold;
  line-height: 22px;
  animation: ${fadeIn} 0.5s ease-in;
  animation-fill-mode: forwards;
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VoteButton = styled.a`
  padding: 0px !important;
  border-left: none !important;
  &:hover {
    cursor: pointer;
    background: none !important;
  }
`;

export const VoteIconUp = styled.span`
  padding: 5px !important;
  border-left: none !important;
  animation: ${slideOver} 0.5s ease-in-out;
  animation-fill-mode: forwards;
  &:nth-of-type(2) {
    animation: ${fadeOut} 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
`;

export const VoteIconDown = styled.span`
  padding: 5px !important;
  border-left: none !important;
  // animation: ${slideOver} 0.5s ease-in-out;
  // animation-fill-mode: forwards;
  &:nth-of-type(1) {
    animation: ${fadeOut} 0.5s ease-in-out;
    animation-fill-mode: forwards;
  }
`;

export const Divider = styled.div`
  width: 2px;
  height: 20px;
  left: 32px;
  background: #e9ebed;
  align-self: center;
  margin: 0 12px;
`;
export const Divider2 = styled.div`
  width: 2px;
  height: 20px;
  left: 32px;
  background: none;
  align-self: center;
  margin: 0 5px;
`;
