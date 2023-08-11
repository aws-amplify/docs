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

const Feedback = forwardRef(function Feedback({}, ref) {
  const [state, setState] = useState(FeedbackState.START);

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

  const onYesVote = useCallback((e) => {
    // trackFeedbackSubmission(true);
    const yesButton = e.currentTarget;
    const noButton = yesButton.nextSibling;
    const feedbackComponent = yesButton.parentElement.parentElement;
    const feedbackText = feedbackComponent.getElementsByTagName('p')[0];
    const feedbackTextWidth = feedbackText.offsetWidth;

    const transitionUpButton = [
      {
        maxWidth: yesButton.offsetWidth + 'px',
        overflow: 'visible'
      },
      {
        maxWidth: '40px',
        overflow: 'hidden',
        color: 'green',
        border: '1px solid green',
        transform: `translateX(-${feedbackTextWidth}px)`,
        marginLeft: '0px'
      }
    ];

    const transitionDownButton = [
      {
        maxWidth: noButton.offsetWidth + 'px',
        overflow: 'visible'
      },
      {
        maxWidth: 0,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        border: 'none'
      }
    ];

    const transitionFeedbackText = [
      { transform: 'translateX(-40px)', opacity: 0 }
    ];

    const animationTiming = {
      duration: 300,
      iterations: 1,
      fill: 'forwards'
    };

    yesButton.animate(transitionUpButton, animationTiming);
    noButton.animate(transitionDownButton, animationTiming);
    feedbackText.animate(transitionFeedbackText, animationTiming);

    setTimeout(function() {
      currentState = FeedbackState.UP;
      setState(currentState);
    }, 300);
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

export default Feedback;
