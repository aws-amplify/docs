import { useEffect, useRef, useState } from 'react';
import { API } from 'aws-amplify';
import isUUID from 'validator/lib/isUUID';
import {
  FeedbackContainer,
  VoteButton,
  VoteButtonsContainer,
  Toggle,
  FeedbackMobileContainer,
  ThankYouContainer
} from './styles';
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
  const [feedbackId, setFeedbackId] = useState<string>();
  const feedbackQuestion = 'Was this page helpful?';
  const feedbackAppreciation = 'Thank you for your feedback!';

  useEffect(() => {
    // UUID of feedback if it exists.
    const id = window.localStorage?.getItem('feedbackId');
    if (id && isUUID(id)) {
      setFeedbackId(id);
    }
  }, []);

  async function submitVote(vote: boolean, comment?: string) {
    // Path without heading link
    const pagePath = window.location.href.split('#')[0];

    const body: Feedback = {
      page_path: pagePath,
      vote: vote
    };

    const headers = {
      'content-type': 'application/json'
    };

    if (feedbackId) {
      body.id = feedbackId;
    }

    try {
      const result = await API.post('submissions', '/submissions', {
        headers,
        body
      });

      if (!feedbackId && result?.data) {
        const data = JSON.parse(result.data);

        if (data.id) {
          window.localStorage?.setItem('feedbackId', data.id);
        }
      }

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return (
    <FeedbackContainer
      style={state === FeedbackState.HIDDEN ? { display: 'none' } : {}}
    >
      {state === FeedbackState.START ? (
        <>
          <p>{feedbackQuestion}</p>
          <VoteButtonsContainer>
            <VoteButton
              onClick={async () => {
                setState(FeedbackState.END);

                const result = await submitVote(true);
                if (result) {
                  trackFeedbackSubmission(true);
                }
              }}
            >
              <img src="/assets/thumbs-up.svg" alt="Thumbs up" />
              Yes
            </VoteButton>
            <VoteButton
              onClick={async () => {
                setState(FeedbackState.END);

                const result = await submitVote(false);
                if (result) {
                  trackFeedbackSubmission(false);
                }
              }}
            >
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
    if (feedbackContainer.current.contains(e.target)) {
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
