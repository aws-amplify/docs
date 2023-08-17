import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideOver = keyframes`
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
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

export const FeedbackContainer = styled.div`
  margin: 32px 0;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    &.down {
      flex-direction: column;
      align-items: flex-start;
      animation: ${fadeIn} 0.2s ease-in-out 0.3s;
      animation-fill-mode: forwards;
    }
  }

  &.hide {
    display: none;
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

  &.down-response {
    align-self: flex-start;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e5e9;
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

export const VoteButtonAfter = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 6px;
  padding: 5px 12px;
  justify-content: space-between;
  margin-right: 12px;
  max-width: 40px;
  height: 34px;

  &.up-response {
    border: 1px solid #037f0c;
    background: #f2faf3;

    span {
      padding: 0;
      height: 16px;
      margin-right: 12px;
      animation: ${fadeIn} 0.2s ease-in-out;
      animation-fill-mode: forwards;
    }
  }

  &.down-response {
    border: 1px solid #d91515;
    background: #fff4f4;

    span {
      height: 16px;
    }
  }
`;

export const FeedbackTextAfter = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;

  &.up-response {
    color: #037f0c;
    animation: ${slideOver} 0.1s ease-in-out;
    animation-fill-mode: forwards;
  }

  &.down-response {
    color: #d91515;
  }

  &.cta {
    margin-top: 12px;
  }
`;

export const ButtonStyles = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  a {
    background: none;
    cursor: pointer;
    color: #414d5c;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    border-radius: 10px;
    border: 2px solid #9ba7b6;
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
