import { useCallback, useRef, useState } from 'react';
import {
  FeedbackContainer,
  VoteButton,
  VoteButtonsContainer,
  Toggle,
  FeedbackMobileContainer,
  ThankYouContainer
} from './styles';
import { useEffect } from 'react';
import { trackFeedbackSubmission } from '../../utils/track';

enum FeedbackState {
  START = 'START',
  END = 'END',
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
  const feedbackQuestion = 'Was this page helpful?';
  const feedbackAppreciation = 'Thank you for your feedback!';

  const onYesVote = useCallback(() => {
    setState(FeedbackState.END);

    trackFeedbackSubmission(true);
  }, []);

  const onNoVote = useCallback(() => {
    setState(FeedbackState.END);

    trackFeedbackSubmission(false);
  }, []);

  return (
    <FeedbackContainer
      style={state === FeedbackState.HIDDEN ? { display: 'none' } : {}}
    >
      {state == FeedbackState.START ? (
        <>
          <p>{feedbackQuestion}</p>
          <VoteButtonsContainer>
            <VoteButton onClick={onYesVote}>
              <img src="/assets/thumbs-up.svg" alt="Thumbs up" />
              Yes
            </VoteButton>
            <VoteButton onClick={onNoVote}>
              <img src="/assets/thumbs-down.svg" alt="Thumbs down" />
              No
            </VoteButton>
          </VoteButtonsContainer>
        </>
      ) : (
        <ThankYouContainer>
          <p>{feedbackAppreciation}</p>
        </ThankYouContainer>
      )}
    </FeedbackContainer>
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
        <img src="/assets/thumbs-up.svg" alt="Thumbs up" />
        <img src="/assets/thumbs-down.svg" alt="Thumbs down" />
      </Toggle>
    </div>
  );
}
