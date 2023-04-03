import { useCallback, useRef, useState } from 'react';
import {
  FeedbackSticky,
  VoteButton,
  VoteIcon,
  VoteButtonsContainer,
  Toggle,
  FeedbackMobileContainer,
  FeedbackText,
  Divider,
  Divider2,
  ThankYouResponse,
  LeaveGitHubResponse,
  InitialLoad,
  SecondaryLoad,
  Details
} from './styles';
import { useEffect } from 'react';
import { trackFeedbackSubmission } from '../../utils/track';
import Icon from '@cloudscape-design/components/icon';
import Button from '@cloudscape-design/components/button';
import '@cloudscape-design/global-styles/index.css';

enum FeedbackState {
  START = 'START',
  UP = 'UP END',
  DOWN = 'DOWN END',
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
  const thumbsUpResponse = 'Thanks for the thumbs up!';
  const thumbsDownResponse = "We're sorry we let you down";

  const onYesVote = useCallback(() => {
    setState(FeedbackState.UP);
    // trackFeedbackSubmission(true);
  }, []);

  const onNoVote = useCallback(() => {
    setState(FeedbackState.DOWN);
    // trackFeedbackSubmission(false);
  }, []);

  return (
    <>
      {state == FeedbackState.START ? (
        <FeedbackSticky>
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
        </FeedbackSticky>
      ) : state == FeedbackState.UP ? (
        <ThankYouResponse>
          <FeedbackText>{thumbsUpResponse}</FeedbackText>
          <VoteButtonsContainer>
            <VoteIcon>
              <Icon
                name="thumbs-up-filled"
                variant="success"
                size="medium"
              ></Icon>
            </VoteIcon>
            <Divider2 />
            <VoteIcon>
              <Icon
                name="thumbs-down-filled"
                variant="error"
                size="medium"
              ></Icon>
            </VoteIcon>
          </VoteButtonsContainer>
        </ThankYouResponse>
      ) : state == FeedbackState.DOWN ? (
        <LeaveGitHubResponse>
          <InitialLoad>
            <FeedbackText>{thumbsDownResponse}</FeedbackText>
            <VoteButtonsContainer>
              <VoteIcon>
                <Icon
                  name="thumbs-down-filled"
                  variant="error"
                  size="medium"
                ></Icon>
              </VoteIcon>
            </VoteButtonsContainer>
          </InitialLoad>
          <SecondaryLoad>
            <Details>
              <p>Can you provide more details?</p>
              <Icon name="close" size="medium"></Icon>
            </Details>
            <Button iconName="external" iconAlign="right">
              File an issue on GitHub
            </Button>
          </SecondaryLoad>
        </LeaveGitHubResponse>
      ) : (
        <div></div>
      )}
    </>
  );
}

export function FeedbackToggle() {
  const [inView, setInView] = useState(false);
  const feedbackContainer = useRef(null);

  function toggleView() {
    if (inView) {
      setInView(false);
    } else {
      setInView(true);
    }
  }

  function handleClickOutside(e) {
    if (
      feedbackContainer.current &&
      feedbackContainer.current.contains(e.target)
    ) {
      // inside click
      return;
    }
    // outside click
    setInView(false);
  }

  useEffect(() => {
    if (inView) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inView]);

  return (
    <div ref={feedbackContainer}>
      <FeedbackMobileContainer style={inView ? {} : { display: 'none' }}>
        <Feedback></Feedback>
      </FeedbackMobileContainer>
      <Toggle
        onClick={() => {
          toggleView();
        }}
      >
        <Icon name="thumbs-up" alt="Thumbs up" />
        <Icon name="thumbs-down" alt="Thumbs down" />
      </Toggle>
    </div>
  );
}
