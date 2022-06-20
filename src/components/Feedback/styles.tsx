import styled from '@emotion/styled';
import { MQTablet, MQDesktop } from '../media';

export const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 8px;
  width: auto;
  margin: 20px 8px 20px 8px;
  padding: 10px 0px 10px 0px;

  border: 0.05rem solid var(--border-color);
  border-radius: 4px;
  background-color: white;

  ${MQDesktop} {
    border: none;
    border-top: 0.05rem solid var(--border-color);
  }  
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
  padding-top: 5px;
`;

export const VoteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60px;
  padding-right: 5px;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
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
