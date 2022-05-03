import { Amplify } from '@aws-amplify/core';
import { API } from '@aws-amplify/api';
import { useRef, useState } from 'react';
import {
  FeedbackContainer,
  VoteButton,
  VoteButtonsContainer,
  CommentContainer,
  CommentTextArea,
  CommentButtonContainer,
  CommentButton,
  CommentQuestionContainer,
  Toggle,
  FeedbackMobileContainer,
  ThankYouContainer
} from './styles';
import awsconfig from '../../aws-exports';
import { useEffect } from 'react';
import isUUID from 'validator/lib/isUUID';
import { trackFeedbackSubmission } from '../../utils/track';

Amplify.configure(awsconfig);
if (process.env.API_ENV === 'production') {
  Amplify.configure({
    aws_cloud_logic_custom: [
      {
        name: 'submissions',
        endpoint: 'https://docs-backend.amplify.aws',
        region: 'us-west-2'
      }
    ]
  });
}

enum FeedbackState {
  START = 'START',
  YES = 'YES',
  NO = 'NO',
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
  const [feedbackId, setFeedbackId] = useState(undefined);
  const [feedbackVote, setFeedbackVote] = useState(undefined);
  const feedbackComment = useRef(null);
  const feedbackQuestion = 'Was this page helpful?';
  const reasonForVote = feedbackVote
    ? 'What did we do well?'
    : 'What can we do better?';
  const feedbackAppreciation = 'Thank you for your feedback!';

  useEffect(() => {
    // UUID of feedback if it exists.
    const id = window.localStorage.getItem('feedbackId');
    if (id && isUUID(id)) {
      setFeedbackId(id);
    }
  }, []);

  async function submitVote(vote: boolean, comment?: string) {
    // Path without heading link
    const pagePath = window.location.href.split('#')[0];

    const body: Feedback = {
      page_path: pagePath,
      vote: vote,
      comment: comment ? comment : ''
    };

    const headers = {
      'content-type': 'application/json'
    };

    if (feedbackId) {
      body.id = feedbackId;
    }

    try {
      trackFeedbackSubmission(vote);

      const result = await API.post('submissions', '/submissions', {
        headers,
        body
      });

      if (!feedbackId && result?.data) {
        const data = JSON.parse(result.data);

        if (data.id) {
          window.localStorage.setItem('feedbackId', data.id);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FeedbackContainer style={state === FeedbackState.HIDDEN ? {display: 'none'} : {} }>
      {state == FeedbackState.START ? (
        <>
          <p>{feedbackQuestion}</p>
          <VoteButtonsContainer>
            <VoteButton
              onClick={() => {
                setState(FeedbackState.YES);
                setFeedbackVote(true);
                submitVote(true);
              }}
            >
              <img src="/assets/thumbs-up.svg" alt="Thumbs up" />
              Yes
            </VoteButton>
            <VoteButton
              onClick={() => {
                setState(FeedbackState.NO);
                setFeedbackVote(false);
                submitVote(false);
              }}
            >
              <img src="/assets/thumbs-down.svg" alt="Thumbs down" />
              No
            </VoteButton>
          </VoteButtonsContainer>
        </>
      ) : (
        <>
          {[FeedbackState.YES, FeedbackState.NO].includes(state) ? (
            <CommentContainer>
              <CommentQuestionContainer>
                <label htmlFor="feedback-comment">{reasonForVote}</label>
                <span
                  id="optional-feedback"
                  style={{ fontSize: '0.7rem', opacity: 0.8 }}
                >
                  Optional
                </span>
              </CommentQuestionContainer>
              <CommentTextArea
                id="feedback-comment"
                name="feedback-comment"
                ref={feedbackComment}
                aria-describedby="optional-feedback"
              ></CommentTextArea>
              <CommentButtonContainer>
                <CommentButton
                  onClick={() => {
                    setState(FeedbackState.END);
                    submitVote(feedbackVote, feedbackComment.current.value);
                  }}
                >
                  Submit
                </CommentButton>
                <CommentButton
                  onClick={() => {
                    setState(FeedbackState.START);
                  }}
                >
                  Cancel
                </CommentButton>
              </CommentButtonContainer>
            </CommentContainer>
          ) : (
            <ThankYouContainer>
              <div onClick={() => {setState(FeedbackState.HIDDEN)}} className="close-btn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.364 3.05024L12.9497 1.63603L8 6.58577L3.05025 1.63603L1.63604 3.05024L6.58579 7.99999L1.63604 12.9497L3.05025 14.3639L8 9.4142L12.9497 14.3639L14.364 12.9497L9.41421 7.99999L14.364 3.05024Z"
                    fill="#545B64"
                  ></path>
                </svg>
              </div>
              <p>{feedbackAppreciation}</p>
            </ThankYouContainer>
          )}
        </>
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
