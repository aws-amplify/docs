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
    transform: translateX(46px);
  }
`;

const expand = keyframes`
  0% {
    overflow: hidden;
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

export const FeedbackContainer = styled.div`
  &.START,
  &.UP,
  &.DOWN {
    border: 2px solid #d1d5db;
  }
  position: fixed;
  min-width: 268px !important;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px;
  transition: bottom 0.4s;
  animation: ${slideIn} 0.5s linear;
  filter: drop-shadow(0px 4px 20px rgba(0, 7, 22, 0.12));
  box-sizing: border-box;

  &.START {
    background-color: #ffffff;
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  &.UP {
    background-color: #f2fcf3;
    animation: ${fadeOut} 0.4s ease-in-out 1.5s;
    animation-fill-mode: forwards;
    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  &.DOWN {
    background-color: #fff7f7;
    max-height: 50px;
    overflow: hidden;
    animation: ${expand} 0.4s ease-in-out 0.4s;
    animation-fill-mode: forwards;
    div > .response {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      line-height: 22px;
      padding-bottom: 12px;
      border-bottom: 2px solid #e9ebed;
    }
    div > .expanding-section {
      display: flex;
      flex-direction: column;
      .cta {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 12px 0;
        p {
          line-height: 22px;
          font-size: 14px;
        }
        button {
          padding: 0px !important;
          border: 0 !important;
          span {
            cursor: pointer !important;
            padding: 0 !important;
            height: unset !important;
          }
        }
      }
    }
  }
  .sizing {
    font-weight: bold;
    font-size: 14px;
    margin-right: 34px;
    align-items: left;
    visibility: hidden;
    height: 0;
  }
  ${MQDesktop} {
    right: calc(((100vw - 90rem) / 2) + 16.875rem + 32px);
    left: unset;
    transform: unset;
  }
`;

export const FeedbackText = styled.p`
  margin-right: 12px;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  animation: ${fadeIn} 0.4s ease-in-out;
  animation-fill-mode: forwards;
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 66px;
  height: 20px;
  justify-content: center;
  span {
    padding: 0 !important;
    height: unset !important;
  }
  &.up {
    display: flex;
    flex-direction: row;
    animation: ${slideOver} 0.4s ease-in-out;
    animation-fill-mode: forwards;
    width: 66px;
    position: absolute;
    right: 16px;
    > :nth-of-type(2),
    div {
      animation: ${fadeOut} 0.2s ease-in-out;
      animation-fill-mode: forwards;
    }
  }
  &.down {
    display: flex;
    flex-direction: row;
    width: 66px;
    position: absolute;
    right: 16px;
    > :nth-of-type(1) {
      animation: ${fadeOut} 0.2s ease-in-out, ${slideOver} 0.4s ease-in-out;
      animation-fill-mode: forwards;
    }
  }
`;

export const VoteButtonReplace = styled.div`
  display: flex;
  flex-direction: row;
  transform: translateX(49px);
  animation: ${slideOver} 0.4s ease-in-out;
  animation-fill-mode: forwards;
  width: 66px;
  position: absolute;
  right: 16px;
  opacity: 0;
  span {
    padding: 0 !important;
  }
`;

export const VoteButton = styled.a`
  padding: 0px !important;
  border-left: none !important;
  &:hover {
    cursor: pointer;
    background: none !important;
  }
  span {
    padding: 0 !important;
    height: unset !important;
  }
`;

export const ButtonStyles = styled.span`
  display: flex;
  justify-content: center !important;
  width: 100%;
  a {
    background: none !important;
    cursor: pointer;
    color: #414d5c !important;
    border-color: #414d5c !important;
    width: 100%;
    display: flex !important;
    justify-content: center;
    span {
      cursor: pointer;
    }
    &:hover {
      border-color: #000716 !important;
      color: #000716 !important;
      background: rgba(0, 7, 22, 0.05) !important;
    }
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
