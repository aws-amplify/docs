import { useRef, useCallback } from 'react';
import { trackFeedbackSubmission } from '../../utils/track';
import { IconThumbsUp, IconThumbsDown, ExternalLinkIcon } from '../Icons';
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
const Feedback = function Feedback() {
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);
  const yesTextRef = useRef(null);
  const noTextRef = useRef(null);
  const voteResponseRef = useRef(null);
  const ctaRef = useRef(null);

  // Feedback Component Customizations
  const c = {
    feedbackQuestion: 'Was this page helpful?',
    voteResponse: 'Thanks for your feedback!',
    noVoteCTA: 'Can you provide more details?',
    noVoteCTAButton: 'File an issue on GitHub',
    ctaIcon: 'external',
    iconPosition: 'right',
    buttonLink: 'https://github.com/aws-amplify/docs/issues/new/choose'
  };

  const onYesVote = useCallback(() => {
    trackFeedbackSubmission(true);
    yesButtonRef.current?.setAttribute('disabled', true);
    yesButtonRef.current.style.pointerEvents = 'none';
    noButtonRef.current?.setAttribute('disabled', true);
    noButtonRef.current.style.pointerEvents = 'none';

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
        transform: 'translate(0)'
        // overflow: 'visible',
        // display: 'block'
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
        display: 'none'
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
    trackFeedbackSubmission(false);
    yesButtonRef.current?.setAttribute('disabled', true);
    yesButtonRef.current.style.pointerEvents = 'none';
    noButtonRef.current?.setAttribute('disabled', true);
    noButtonRef.current.style.pointerEvents = 'none';

    const transitionUpButton = [
      {
        maxWidth: yesButtonRef.current?.offsetWidth + 'px'
      },
      {
        maxWidth: 0,
        padding: 0,
        display: 'none',

        opacity: 0
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
        display: 'block'
      }
    ];

    const transitionResponseCTA = [
      {
        opacity: 1,
        height: 0
      },
      {
        overflow: 'visible',
        opacity: 1,
        height: '100px'
      }
    ];

    const animationTiming = {
      duration: 300,
      iterations: 1,
      fill: 'forwards'
    };

    const animationTimingDelayed = {
      delay: 500,
      duration: 1000,
      iterations: 1,
      fill: 'forwards'
    };

    if (typeof yesButtonRef.current?.animate == 'function') {
      yesButtonRef.current?.animate(transitionUpButton, animationTiming);
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
    if (typeof ctaRef.current?.animate == 'function') {
      ctaRef.current?.animate(transitionResponseCTA, animationTimingDelayed);
    }
  }, []);

  return (
    <Flex className="feedback">
      <div id="start-state" aria-label={c.feedbackQuestion} role="group">
        <Text className="feedback-text">{c.feedbackQuestion}</Text>
        <Flex className="vote-buttons-container">
          <Button
            className="vote-button"
            onClick={onYesVote}
            aria-label="Yes"
            ref={yesButtonRef}
          >
            <IconThumbsUp />
            <Text ref={yesTextRef}>Yes</Text>
          </Button>
          <Button
            className="vote-button"
            onClick={onNoVote}
            aria-label="No"
            ref={noButtonRef}
          >
            <IconThumbsDown />
            <Text ref={noTextRef}>No</Text>
          </Button>
          <Flex className="vote-response" ref={voteResponseRef}>
            <Text className="vote-response-text">{c.voteResponse}</Text>
            <Flex className="vote-response-no" ref={ctaRef}>
              <Text className="vote-response-no-cta">{c.noVoteCTA}</Text>
              <Button className="vote-response-no-cta-button">
                <ExternalLink href={c.buttonLink} icon={false}>
                  {c.noVoteCTAButton}
                  <ExternalLinkIcon />
                </ExternalLink>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default Feedback;
