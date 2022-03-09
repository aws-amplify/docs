import { Amplify } from '@aws-amplify/core';
import { API } from '@aws-amplify/api';
import { useState } from 'react';
import { FeedbackStyle, VoteButtonStyle, VoteButtonDivStyle } from './styles';
import { useRouter } from 'next/router';
import awsconfig from '../../aws-exports';
import { useEffect } from 'react';
import isUUID from 'validator/lib/isUUID';

Amplify.configure(awsconfig);

enum FeedbackState {
  START = 'START',
  END = 'END'
}

type Feedback = {
  vote: boolean;
  page_path: string;
  id?: string;
};

export default function Feedback() {
  const [state, setState] = useState<FeedbackState>(FeedbackState.START);
  const [feedbackId, setFeedbackId] = useState(undefined);
  const router = useRouter();
  const feedbackQuestion = 'Was this page helpful?';
  const feedbackAppreciation = 'Thank you for your feedback!';

  useEffect(() => {
    // UUID of feedback if it exists.
    const id = window.localStorage.getItem('feedbackId');
    if (id && isUUID(id)) {
      setFeedbackId(id);
    }
  }, []);

  async function submitVote(vote: boolean) {
    setState(FeedbackState.END);

    // Path without heading link
    const pagePath = router.asPath.split('#')[0];

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
          window.localStorage.setItem('feedbackId', data.id);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FeedbackStyle>
      {state === FeedbackState.START ? (
        <>
          <p>{feedbackQuestion}</p>
          <VoteButtonDivStyle>
            <VoteButtonStyle onClick={() => submitVote(true)}>
              <img src="/assets/thumbs-up.svg" alt="Thumbs up" />
              Yes
            </VoteButtonStyle>
            <VoteButtonStyle onClick={() => submitVote(false)}>
              <img src="/assets/thumbs-down.svg" alt="Thumbs up" />
              No
            </VoteButtonStyle>
          </VoteButtonDivStyle>
        </>
      ) : (
        <p>{feedbackAppreciation}</p>
      )}
    </FeedbackStyle>
  );
}
