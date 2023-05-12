import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FeedbackContainer,
  VoteButton,
  VoteButtonReplace,
  VoteButtonsContainer,
  FeedbackText,
  Divider,
  ButtonStyles
} from './styles';
import { trackFeedbackSubmission } from '../../utils/track';
import { Icon, Button } from '@cloudscape-design/components';

enum FeedbackState {
  START = 'START',
  UP = 'UP',
  DOWN = 'DOWN'
}

type Feedback = {
  vote: boolean;
  page_path: string;
  id?: string;
  comment?: string;
};

export default function Feedback({ footer }) {
  const [state, setState] = useState<FeedbackState>(FeedbackState.START);
  const containerRef = useRef<HTMLElement>(null);
  const feedbackQuestion = 'Did this page help you?';
  const yesVoteResponse = 'Thanks for the thumbs up!';
  const noVoteResponse = "We're sorry we let you down";
  const noVoteCTA = 'Can you provide more details?';
  const noVoteCTAButton = 'File an issue on GitHub';
  const ctaIcon = 'external';
  const iconPosition = 'right';
  const buttonLink = 'https://github.com/aws-amplify/docs/issues/new/choose';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('touchmove', hideFeedback);
      document.addEventListener('scroll', hideFeedback);
    }
  }, []);

  let prevScrollPos = window.scrollY;

  function hideFeedback() {
    const currentScrollPos = window.scrollY;
    const visibleFooter =
      document.body.scrollHeight - footer.current.offsetHeight + 50 <=
      currentScrollPos + window.innerHeight;
    const scrollingUp = prevScrollPos >= currentScrollPos;
    const scrollingDown = prevScrollPos < currentScrollPos;
    if (
      ((scrollingUp && visibleFooter) || scrollingDown) &&
      containerRef.current
    ) {
      containerRef.current.classList.remove('slideIn');
      containerRef.current.classList.add('slideOut');
    } else if (scrollingUp && containerRef.current) {
      containerRef.current.classList.remove('slideOut');
      containerRef.current.classList.add('slideIn');
    }
    prevScrollPos = currentScrollPos;
  }

  const onYesVote = useCallback(() => {
    setState(FeedbackState.UP);
    // trackFeedbackSubmission(true);
  }, []);

  const onNoVote = useCallback(() => {
    setState(FeedbackState.DOWN);
    // trackFeedbackSubmission(false);
  }, []);

  const close = useCallback(() => {
    // const feedbackContainer = containerRef.current;
    if (containerRef.current) containerRef.current.classList.add('close');
  }, []);

  return (
    <FeedbackContainer
      id="feedback-container"
      ref={containerRef}
      className={state}
    >
      <div className="sizing" aria-hidden="true">
        {yesVoteResponse}
      </div>
      <div className="sizing" aria-hidden="true">
        {noVoteResponse}
      </div>
      <div className="sizing" aria-hidden="true">
        {feedbackQuestion}
      </div>

      {state == FeedbackState.START ? (
        <div aria-label={feedbackQuestion} tabIndex={0}>
          <FeedbackText>{feedbackQuestion}</FeedbackText>
          <VoteButtonsContainer>
            <VoteButton
              href="#"
              onClick={onYesVote}
              aria-label="thumbs up"
              role="button"
              tabIndex={0}
            >
              <Icon name="thumbs-up" variant="link" size="medium"></Icon>
            </VoteButton>
            <Divider />
            <VoteButton
              href="#"
              onClick={onNoVote}
              aria-label="thumbs down"
              role="button"
              tabIndex={0}
            >
              <Icon name="thumbs-down" variant="link" size="medium"></Icon>
            </VoteButton>
          </VoteButtonsContainer>
        </div>
      ) : state == FeedbackState.UP ? (
        <div>
          <FeedbackText>{yesVoteResponse}</FeedbackText>
          <VoteButtonsContainer className="up">
            <Icon
              name="thumbs-up-filled"
              variant="success"
              size="medium"
            ></Icon>
            <Divider />
            <Icon name="thumbs-down" variant="link" size="medium"></Icon>
          </VoteButtonsContainer>
          <VoteButtonReplace>
            <Icon
              name="thumbs-up-filled"
              variant="success"
              size="medium"
            ></Icon>
          </VoteButtonReplace>
        </div>
      ) : state == FeedbackState.DOWN ? (
        <div>
          <div className="response">
            <FeedbackText>{noVoteResponse}</FeedbackText>
            <VoteButtonsContainer className="down">
              <Icon name="thumbs-up" variant="link" size="medium"></Icon>
              <Divider />
              <Icon
                name="thumbs-down-filled"
                variant="error"
                size="medium"
              ></Icon>
            </VoteButtonsContainer>
          </div>
          <div className="expanding-section">
            <div className="cta">
              <p>{noVoteCTA}</p>
              <Button
                iconName="close"
                variant="icon"
                aria-label="close"
                onClick={close}
              ></Button>
            </div>
            <ButtonStyles>
              <Button
                href={buttonLink}
                iconName={ctaIcon}
                iconAlign={iconPosition}
                aria-label={noVoteCTAButton}
              >
                {noVoteCTAButton}
              </Button>
            </ButtonStyles>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </FeedbackContainer>
  );
}
