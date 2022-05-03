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

  border-top: 0.05rem solid var(--border-color);
  border-radius: 4px;
  background-color: white;
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

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
  padding: 0px 15px 0px 15px;
`;

export const CommentQuestionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CommentTextArea = styled.textarea`
  resize: none;
  border: 1px solid grey;
  padding: 8px;
  box-sizing: border-box;
  overflow-y: scroll;
  width: 100%;
`;

export const CommentButtonContainer = styled.div`
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  width: 150px;
`;

export const CommentButton = styled.button`
  width: 60px;
  height: 28px;
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
  width: 100%;
  padding: 0px 10px 5px 10px;
  text-align: center;

  .close-btn {
    display: none;

    ${MQDesktop} {
      display: flex;
      align-self: flex-end;
      cursor: pointer;
      width: 16px;
      height: 16px;
    }
  }
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
