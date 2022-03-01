import styled from "@emotion/styled";

export const FeedbackStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: center;
`;

export const VoteButtonDivStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
  padding-top: 5px;
`;

export const VoteButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60px;
  
  &:hover{
    cursor: pointer;
    opacity: 0.6;
  }
`;