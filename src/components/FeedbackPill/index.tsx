import { useCallback, useEffect, useRef, useState } from 'react';
import { FeedbackContainer, VoteButton } from './styles';
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

export default function Feedback() {
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
    trackFeedbackSubmission(true);
  }, []);

  const onNoVote = useCallback(() => {
    currentState = FeedbackState.DOWN;
    setState(currentState);
    trackFeedbackSubmission(false);
  }, []);

  return (
    <FeedbackContainer
      id="feedback-container"
      ref={containerRef}
      aria-hidden={state == FeedbackState.UP ? true : false}
    >
      {(() => {
        switch (state) {
          case 'START':
            return (
              <div aria-label={c.feedbackQuestion}>
                <div>{c.feedbackQuestion}</div>
                <VoteButton
                  href="#"
                  onClick={onYesVote}
                  aria-label="Yes"
                  role="button"
                >
                  <ThumbsUpIcon />
                </VoteButton>
                <VoteButton
                  href="#"
                  onClick={onNoVote}
                  aria-label="No"
                  role="button"
                >
                  <ThumbsDownIcon />
                </VoteButton>
              </div>
            );
          case 'UP':
            return (
              <div>
                <p>{c.yesVoteResponse}</p>
                <div className="up">
                  <ThumbsUpFilledIcon />
                  <ThumbsDownIcon />
                </div>
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
}
