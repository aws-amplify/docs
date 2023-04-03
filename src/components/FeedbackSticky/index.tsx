import { useCallback, useRef, useState } from 'react';
import {
  VotePrompt,
  VoteButton,
  VoteIconDown,
  VoteIconUp,
  FeedbackSticky,
  VoteButtonsContainer,
  FeedbackText,
  Divider,
  Divider2,
  YesVoteResponse,
  NoVoteResponse,
  InitialLoad,
  SecondaryLoad,
  Details
} from './styles';
import { useEffect } from 'react';
import { trackFeedbackSubmission } from '../../utils/track';
import Icon from '@cloudscape-design/components/icon';
import Button from '@cloudscape-design/components/button';

enum FeedbackState {
  START = 'START',
  UP = 'VOTE UP',
  DOWN = 'VOTE DOWN',
  HIDDEN = 'HIDDEN'
}

type Feedback = {
  vote: boolean;
  page_path: string;
  id?: string;
  comment?: string;
};

export default function Feedback() {
  const [state, setState] = useState<FeedbackState>(FeedbackState.START);
  const feedbackQuestion = 'Did this page help you?';
  const yesVoteResponse =
    'Thanks for all of the things you do for us. OVer and over and over again!';
  const noVoteResponse = "We're sorry";
  const noVoteSecondary = 'Can you provide more details?';
  const noVoteCTAButton = 'File an issue on GitHub';
  const ctaIcon = 'external';

  const onYesVote = useCallback(() => {
    setState(FeedbackState.UP);
    // trackFeedbackSubmission(true);
  }, []);

  const onNoVote = useCallback(() => {
    setState(FeedbackState.DOWN);
    // trackFeedbackSubmission(false);
  }, []);

  const close = useCallback(() => {
    setState(FeedbackState.HIDDEN);
  }, []);

  return (
    <FeedbackSticky>
      {state == FeedbackState.START ? (
        <VotePrompt>
          <FeedbackText>{feedbackQuestion}</FeedbackText>
          <VoteButtonsContainer>
            <VoteButton onClick={onYesVote}>
              <Icon name="thumbs-up" variant="link" size="medium"></Icon>
            </VoteButton>
            <Divider />
            <VoteButton onClick={onNoVote}>
              <Icon name="thumbs-down" variant="link" size="medium"></Icon>
            </VoteButton>
          </VoteButtonsContainer>
        </VotePrompt>
      ) : state == FeedbackState.UP ? (
        <YesVoteResponse>
          <FeedbackText>{yesVoteResponse}</FeedbackText>
          <VoteButtonsContainer>
            <VoteIconUp>
              <Icon name="thumbs-up" variant="success" size="medium"></Icon>
            </VoteIconUp>
            <Divider2 />
            <VoteIconUp>
              <Icon
                name="thumbs-down-filled"
                variant="link"
                size="medium"
              ></Icon>
            </VoteIconUp>
          </VoteButtonsContainer>
        </YesVoteResponse>
      ) : state == FeedbackState.DOWN ? (
        <NoVoteResponse>
          <InitialLoad>
            <FeedbackText>{noVoteResponse}</FeedbackText>
            <VoteButtonsContainer>
              <VoteIconDown>
                <Icon name="thumbs-up" variant="error" size="medium"></Icon>
              </VoteIconDown>
              <Divider2 />
              <VoteIconDown>
                <Icon name="thumbs-down" variant="link" size="medium"></Icon>
              </VoteIconDown>
            </VoteButtonsContainer>
          </InitialLoad>
          <SecondaryLoad>
            <Details>
              <p>{noVoteSecondary}</p>
              <Button iconName="close" variant="icon" onClick={close}></Button>
            </Details>
            <Button iconName={ctaIcon} iconAlign="right">
              {noVoteCTAButton}
            </Button>
          </SecondaryLoad>
        </NoVoteResponse>
      ) : (
        <div></div>
      )}
    </FeedbackSticky>
  );
}
