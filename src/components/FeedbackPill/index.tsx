import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
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
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  ThumbsUpFilledIcon,
  ThumbsDownFilledIcon,
  CloseIcon
} from '../Icons';
import ExternalLink from '../ExternalLink';

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

const FeedbackPill = forwardRef(function FeedbackPill({}, ref) {
  const [state, setState] = useState(FeedbackState.START);
  const containerRef = useRef<HTMLDivElement>(null);

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

  let currentState = state;

  const onYesVote = useCallback(() => {
    currentState = FeedbackState.UP;
    setState(currentState);
    // trackFeedbackSubmission(true);
  }, []);

  const onNoVote = useCallback(() => {
    currentState = FeedbackState.DOWN;
    setState(currentState);
    // trackFeedbackSubmission(false);
  }, []);

  return (
    <FeedbackContainer
      id="feedback-container"
      ref={ref}
      aria-hidden={state == FeedbackState.UP ? true : false}
    >
      {(() => {
        switch (state) {
          case 'START':
            return (
              <div aria-label={c.feedbackQuestion} tabIndex={0}>
                <FeedbackText>{c.feedbackQuestion}</FeedbackText>
                <VoteButtonsContainer>
                  <VoteButton
                    onClick={onYesVote}
                    aria-label="Yes"
                    role="button"
                    tabIndex={0}
                  >
                    <ThumbsUpIcon />
                    <FeedbackText>Yes</FeedbackText>
                  </VoteButton>
                  <VoteButton
                    onClick={onNoVote}
                    aria-label="No"
                    role="button"
                    tabIndex={0}
                  >
                    <ThumbsDownIcon />
                    <FeedbackText>No</FeedbackText>
                  </VoteButton>
                </VoteButtonsContainer>
              </div>
            );
          case 'UP':
            return (
              <div className="up">
                <div>
                  <ThumbsUpFilledIcon />
                </div>
                <p>{c.yesVoteResponse}</p>
              </div>
            );
          case 'DOWN':
            return (
              <div>
                <div className="response">
                  <p>{c.noVoteResponse}</p>
                  <div className="down">
                    <ThumbsUpIcon />
                    <ThumbsDownFilledIcon />
                  </div>
                </div>
                <div className="expanding-section">
                  <div className="cta">
                    <p>{c.noVoteCTA}</p>
                  </div>
                  <button>
                    <ExternalLink href={c.buttonLink} icon={true}>
                      {c.noVoteCTAButton}
                    </ExternalLink>
                  </button>
                </div>
              </div>
            );
          default:
            return <div></div>;
        }
      })()}
    </FeedbackContainer>
  );
});

export default FeedbackPill;
