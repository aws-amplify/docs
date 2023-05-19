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
  DOWN = 'DOWN',
  HIDDEN = 'HIDDEN'
}

type Feedback = {
  vote: boolean;
  page_path: string;
  id?: string;
  comment?: string;
};

export default function Feedback({ footerRef }) {
  const [state, setState] = useState<FeedbackState>(FeedbackState.START);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;

    if (typeof window !== 'undefined') {
      window.addEventListener('touchmove', hideFeedback);
      window.addEventListener('scroll', hideFeedback);

      let prevScrollPos = window.scrollY;

      // eslint-disable-next-line no-inner-declarations
      function hideFeedback() {
        // Scroll variables and calculations
        const currPos = window.scrollY,
          footerVisible =
            document.body.scrollHeight - footer.offsetHeight + 50 <=
            currPos + window.innerHeight,
          up = prevScrollPos >= currPos,
          down = prevScrollPos < currPos,
          container = containerRef.current;

        if (
          container &&
          ((up && footerVisible) || down) &&
          !container.classList.contains('close')
        ) {
          container.classList.remove('slideIn'),
            container.classList.add('slideOut'),
            (container.ariaHidden = 'true');
        } else if (container && up && !container.classList.contains('close')) {
          container.classList.remove('slideOut'),
            container.classList.add('slideIn'),
            (container.ariaHidden = 'false');
        }
        prevScrollPos = currPos;
      }
    }
  }, []);

  // Feedback Component Customizations
  const c = {
    feedbackQuestion: 'Was this page helpful?',
    yesVoteResponse: 'Thanks for your feedback!',
    noVoteResponse: 'Thanks for your feedback!',
    noVoteCTA: 'Can you provide more details?',
    noVoteCTAButton: 'File an issue on GitHub',
    ctaIcon: 'external',
    iconPosition: 'right',
    buttonLink: 'https://github.com/aws-amplify/docs/issues/new/choose'
  };

  const onYesVote = useCallback(() => {
    setState(FeedbackState.UP);
    trackFeedbackSubmission(true);
  }, []);

  const onNoVote = useCallback(() => {
    setState(FeedbackState.DOWN);
    trackFeedbackSubmission(false);
  }, []);

  const close = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('close'),
        containerRef.current.classList.remove('slideIn'),
        (containerRef.current.ariaHidden = 'true');
    }
  }, []);

  return (
    <FeedbackContainer
      id="feedback-container"
      ref={containerRef}
      className={state}
      aria-hidden={state == FeedbackState.UP ? true : false}
    >
      <div className="sizing" aria-hidden="true">
        {c.yesVoteResponse}
      </div>
      <div className="sizing" aria-hidden="true">
        {c.noVoteResponse}
      </div>
      <div className="sizing" aria-hidden="true">
        {c.feedbackQuestion}
      </div>

      {state == FeedbackState.START ? (
        <div aria-label={c.feedbackQuestion} tabIndex={0}>
          <FeedbackText>{c.feedbackQuestion}</FeedbackText>
          <VoteButtonsContainer>
            <VoteButton
              href="#"
              onClick={onYesVote}
              aria-label="Yes"
              role="button"
              tabIndex={0}
            >
              <Icon name="thumbs-up" variant="link" size="medium"></Icon>
            </VoteButton>
            <Divider />
            <VoteButton
              href="#"
              onClick={onNoVote}
              aria-label="No"
              role="button"
              tabIndex={0}
            >
              <Icon name="thumbs-down" variant="link" size="medium"></Icon>
            </VoteButton>
          </VoteButtonsContainer>
        </div>
      ) : state == FeedbackState.UP ? (
        <div>
          <FeedbackText>{c.yesVoteResponse}</FeedbackText>
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
            <FeedbackText>{c.noVoteResponse}</FeedbackText>
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
              <p>{c.noVoteCTA}</p>
              <Button
                iconName="close"
                variant="icon"
                aria-label="close"
                onClick={close}
              ></Button>
            </div>
            <ButtonStyles>
              <Button
                href={c.buttonLink}
                iconName={c.ctaIcon}
                iconAlign={c.iconPosition}
                aria-label={c.noVoteCTAButton}
              >
                {c.noVoteCTAButton}
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
