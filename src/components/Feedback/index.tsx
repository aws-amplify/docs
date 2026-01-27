import { useRef, useCallback, useState, useEffect } from 'react';
import { trackFeedbackSubmission } from '@/utils/track';
import { IconThumbsUp, IconThumbsDown } from '../Icons';
import { useIsLegacy } from '@/utils/useIsLegacy';
import ExternalLink from '../ExternalLink';
import { Flex, Text, Button } from '@aws-amplify/ui-react';
import React from 'react';

type Feedback = {
  vote: boolean;
  page_path: string;
  id?: string;
  comment?: string;
};

// eslint-disable-next-line no-empty-pattern
const Feedback = function Feedback(router) {
  const [state, setState] = useState<string>();
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);
  const yesTextRef = useRef(null);
  const noTextRef = useRef(null);
  const voteResponseRef = useRef(null);
  const ctaRef = useRef(null);
  const isLegacy = useIsLegacy();

  useEffect(() => {
    setState('')
  }, [router?.router?.asPath])
  // Feedback Component Customizations
  const c = {
    feedbackQuestion: isLegacy ? 'Was this page helpful?' : 'Was this helpful?',
    voteResponse:
      state == 'yes'
        ? 'Thanks for your feedback!'
        : 'Can you provide more details?',
    noVoteCTALink: 'File an issue on GitHub',
    ctaIcon: 'external',
    iconPosition: 'right',
    buttonLink: 'https://github.com/aws-amplify/docs/issues/new/choose'
  };

  const onYesVote = useCallback(() => {
    setState('yes');
    trackFeedbackSubmission(true);
    if (yesButtonRef.current) {
      yesButtonRef.current.setAttribute('disabled', true);
      yesButtonRef.current.style.pointerEvents = 'none';
    }
    ctaRef.current.style.display = 'none';
    if (noButtonRef.current) {
      noButtonRef.current.setAttribute('style', 'display: none');
    }

    const transitionUpButton = [
      {
        maxWidth: yesButtonRef.current?.offsetWidth + 'px',
        overflow: 'visible'
      },
      {
        maxWidth: '50px', // 16px padding + 18px icon + 16px padding
        overflow: 'hidden',
        color: 'green',
        borderColor: 'green'
      }
    ];

    const transitionUpText = [
      {
        opacity: 1
      },
      {
        opacity: 0,
        width: 0,
        padding: 0
      }
    ];

    const transitionYesResponse = [
      {
        opacity: 0,
        transform: 'translateX(150px)'
      },
      {
        opacity: 1,
        transform: 'translate(0)',
        visibility: 'visible'
      }
    ];

    const transitionDownButton = [
      {
        overflow: 'visible'
      },
      {
        left: 0,
        width: 0,
        margin: 0,
        padding: 0,
        opacity: 0,
        visibility: 'hidden'
      }
    ];

    const animationTiming = {
      duration: 300,
      iterations: 1,
      fill: 'forwards'
    };

    yesButtonRef.current?.animate(transitionUpButton, animationTiming);
    yesTextRef.current?.animate(transitionUpText, animationTiming);
    voteResponseRef.current?.animate(transitionYesResponse, animationTiming);
    noButtonRef.current?.animate(transitionDownButton, animationTiming);
  }, []);

  const onNoVote = useCallback(() => {
    setState('no');
    trackFeedbackSubmission(false);
    noButtonRef.current?.setAttribute('disabled', true);
    noButtonRef.current.style.pointerEvents = 'none';
    ctaRef.current.style.pointerEvents = 'auto';
    voteResponseRef.current.style.pointerEvents = 'auto';

    const transitionUpButton = [
      {
        maxWidth: yesButtonRef.current?.offsetWidth + 'px',
        display: ''
      },
      {
        maxWidth: 0,
        padding: 0,
        display: 'none',
        opacity: 0,
        visibility: 'hidden'
      }
    ];

    const transitionDownButton = [
      {
        maxWidth: noButtonRef.current.offsetWidth + 'px',
        overflow: 'visible'
      },
      {
        maxWidth: '50px', // 16px padding + 18px icon + 16px padding
        overflow: 'hidden',
        color: 'red',
        borderColor: 'red'
      }
    ];

    const transitionDownText = [
      {
        opacity: 1
      },
      {
        opacity: 0,
        width: 0,
        padding: 0
      }
    ];

    const transitionNoResponse = [
      {
        opacity: 0,
        transform: 'translateX(150px)'
      },
      {
        opacity: 1,
        transform: 'translate(0)',
        overflow: 'visible',
        visibility: 'visible'
      }
    ];

    const animationTiming = {
      duration: 300,
      iterations: 1,
      fill: 'forwards'
    };

    if (typeof yesButtonRef.current?.animate == 'function') {
      yesButtonRef.current?.animate(transitionUpButton, animationTiming);
      setTimeout(() => {
        yesButtonRef.current?.setAttribute('style', 'display: none');
      }, 300);
    }
    if (typeof noTextRef.current?.animate == 'function') {
      noTextRef.current?.animate(transitionDownText, animationTiming);
    }
    if (typeof voteResponseRef.current?.animate == 'function') {
      voteResponseRef.current?.animate(transitionNoResponse, animationTiming);
    }
    if (typeof noButtonRef.current?.animate == 'function') {
      noButtonRef.current?.animate(transitionDownButton, animationTiming);
    }
  }, []);

  if (isLegacy) {
    return (
      <Flex className="feedback" key={router?.router?.asPath}>
        <div
          id="start-state"
          aria-labelledby="feedbackGroupTitle"
          role="group"
          aria-live="polite"
        >
          <Text className="feedback-text" id="feedbackGroupTitle">
            {c.feedbackQuestion}
          </Text>
          <Flex className="vote-buttons-container">
            <Button
              className="vote-button"
              onClick={onYesVote}
              ref={yesButtonRef}
            >
              <IconThumbsUp />
              <Text ref={yesTextRef}>Yes</Text>
            </Button>
            <Button className="vote-button" onClick={onNoVote} ref={noButtonRef}>
              <IconThumbsDown />
              <Text ref={noTextRef}>No</Text>
            </Button>
            <Flex className="vote-response" ref={voteResponseRef}>
              <Text className="vote-response-text">{c.voteResponse}</Text>
              <Flex className="vote-response-no" ref={ctaRef} isDisabled>
                <ExternalLink href={c.buttonLink} icon={true}>
                  {c.noVoteCTALink}
                </ExternalLink>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </Flex>
    );
  }
  return (
    <Flex
      id="start-state"
      className={`feedback`}
      direction="row"
      key={router?.router?.asPath}
      aria-live="polite"
      role="group"
      aria-labelledby="feedbackGroupTitle">
      <Text className={`feedback-text ${state ? state === 'yes' ? 'feedback__positive' : state === 'no' ? 'feedback__negative' : '' : ''}`} id="feedbackGroupTitle">
        {c.feedbackQuestion}
      </Text>
      <Flex className="vote-buttons-container">
        <Button
          aria-label="Yes"
          className="vote-button"
          onClick={onYesVote}
          ref={yesButtonRef}
        >
          <IconThumbsUp />
        </Button>
        <Button
          aria-label="No"
          className="vote-button"
          onClick={onNoVote}
          ref={noButtonRef}
        >
          <IconThumbsDown />
        </Button>
        <Flex className="vote-response" ref={voteResponseRef}>
          <Text className="vote-response-text">{c.voteResponse}</Text>
          <Flex className="vote-response-no" ref={ctaRef} isDisabled>
            <ExternalLink href={c.buttonLink} icon={true}>
              {c.noVoteCTALink}
            </ExternalLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Feedback;
