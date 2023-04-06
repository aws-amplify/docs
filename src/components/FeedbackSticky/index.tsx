import { useCallback, useRef, useState } from 'react';
import {
  VotePrompt,
  VoteButton,
  VoteButtonReplace,
  VoteButtonsContainer,
  VoteButtonsAnimation,
  FeedbackText,
  Divider,
  YesVoteResponse,
  NoVoteResponse,
  InitialLoad,
  SecondaryLoad,
  Details,
  closeResponse
} from './styles';
import { useEffect } from 'react';
import { trackFeedbackSubmission } from '../../utils/track';
import { Icon, Button } from '@cloudscape-design/components';

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
  const yesVoteResponse = 'Thanks for the thumbs up!';
  const noVoteResponse = "We're sorry we let you down";
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
    <>
      {state == FeedbackState.START ? (
        <VotePrompt id="votePrompt">
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
        <YesVoteResponse id="yesVoteResponse">
          <FeedbackText>{yesVoteResponse}</FeedbackText>
          <VoteButtonsAnimation>
            <Icon name="thumbs-up" variant="link" size="medium"></Icon>
            <Divider />
            <Icon name="thumbs-down" variant="link" size="medium"></Icon>
          </VoteButtonsAnimation>
          <VoteButtonReplace>
            <Icon
              name="thumbs-up-filled"
              variant="success"
              size="medium"
            ></Icon>
          </VoteButtonReplace>
        </YesVoteResponse>
      ) : state == FeedbackState.DOWN ? (
        <NoVoteResponse id="no-response">
          <InitialLoad>
            <FeedbackText>{noVoteResponse}</FeedbackText>
            <VoteButtonsAnimation>
              <Icon name="thumbs-up" variant="link" size="medium"></Icon>
              <Divider />
              <Icon name="thumbs-down" variant="link" size="medium"></Icon>
            </VoteButtonsAnimation>
            <VoteButtonReplace>
              <Icon
                name="thumbs-down-filled"
                variant="error"
                size="medium"
              ></Icon>
            </VoteButtonReplace>
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
    </>
  );
}
