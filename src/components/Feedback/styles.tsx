import styled from '@emotion/styled';

type VoteButtonProps = {
  selected?: boolean;
};

export const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
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

  ${(props) =>
    !props.disabled
      ? `&:hover {
            cursor: pointer;
            opacity: 0.6;
          }`
      : ''}

  ${(props: VoteButtonProps) =>
    props.selected
      ? `border: 1px black solid;
         font-weight: bold;
         color: black;
        `
      : ''}
`;

export const CommentContainer = styled.div`
  padding-top: 10px;
  display: ${(props) => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

export const CommentQuestionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const CommentTextArea = styled.textarea`
  resize: vertical;
  border: 1px solid grey;
  padding: 8px;
  box-sizing: border-box;
`;

export const CommentButtonContainer = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 150px;
`;

export const CommentSubmitButton = styled.button`
  width: 60px;
  height: 28px;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
