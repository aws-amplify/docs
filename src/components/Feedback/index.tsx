import { forwardRef, useCallback, useState } from 'react';
('');
import { trackFeedbackSubmission } from '../../utils/track';
import { IconThumbsUp, IconThumbsDown, ExternalLinkIcon } from '../Icons';
import ExternalLink from '../ExternalLink';
import { Flex, View, Text, Button } from '@aws-amplify/ui-react';

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

// eslint-disable-next-line no-empty-pattern
const Feedback = forwardRef(function Feedback({}, ref) {
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

  const onYesVote = useCallback((e) => {
    trackFeedbackSubmission(true);
    const yesButton = e.currentTarget;
    const yesButtonText = e.currentTarget.children[1];
    const noButton = yesButton.nextSibling;
    const yesFeedbackText = noButton.nextSibling;
    const feedbackComponent = yesButton.parentElement.parentElement;
    const feedbackText = feedbackComponent.getElementsByTagName('p')[0];
    const feedbackTextWidth = feedbackText.offsetWidth;

    const transitionUpButton = [
      {
        maxWidth: yesButton.offsetWidth + 'px',
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
        overflow: 'visible',
        display: 'block'
      }
    ];

    const transitionDownButton = [
      {
        overflow: 'visible'
      },
      {
        left: 0,
        width: 0,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        border: 'none',
        opacity: 0,
        display: 'none'
      }
    ];

    const transitionFeedbackText = [
      { transform: 'translateX(-150px)', opacity: 0 }
    ];

    const animationTiming = {
      duration: 300,
      iterations: 1,
      fill: 'forwards'
    };

    yesButton.animate(transitionUpButton, animationTiming);
    yesButtonText.animate(transitionUpText, animationTiming);
    yesFeedbackText.animate(transitionYesResponse, animationTiming);
    noButton.animate(transitionDownButton, animationTiming);
    feedbackText.animate(transitionFeedbackText, animationTiming);
  }, []);

  const onNoVote = useCallback((e) => {
    trackFeedbackSubmission(false);
    const noButton = e.currentTarget;
    const noButtonText = e.currentTarget.children[1];
    const yesButton = noButton.previousSibling;
    const noFeedbackText = noButton.nextSibling;
    const feedbackComponent = noButton.parentElement.parentElement;
    const feedbackText = feedbackComponent.getElementsByTagName('p')[0];
    const cta = feedbackComponent.getElementsByClassName('no-vote-response')[0];

    const transitionUpButton = [
      {
        maxWidth: yesButton.offsetWidth + 'px'
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
        maxWidth: noButton.offsetWidth + 'px',
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

    const transitionFeedbackText = [
      { transform: 'translateX(-150px)', opacity: 0 }
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
      delay: 400,
      duration: 1000,
      iterations: 1,
      fill: 'forwards'
    };

    yesButton.animate(transitionUpButton, animationTiming);
    noButtonText.animate(transitionDownText, animationTiming);
    noFeedbackText.animate(transitionNoResponse, animationTiming);
    noButton.animate(transitionDownButton, animationTiming);
    feedbackText.animate(transitionFeedbackText, animationTiming);
    cta.animate(transitionResponseCTA, animationTimingDelayed);
  }, []);

  return (
    <Flex id="feedback-container" ref={ref}>
      <ExternalLink href={editLink}>
        <img src="/assets/github.svg" alt="" width="24" height="24" />
        <span aria-label="Edit this page on GitHub">Edit</span>
      </ExternalLink>

      <div id="start-state" aria-label={c.feedbackQuestion} tabIndex={0}>
        <Text className="feedback-text">{c.feedbackQuestion}</Text>
        <Flex className="vote-buttons-container">
          <Button
            className="vote-button"
            onClick={onYesVote}
            aria-label="Yes"
            role="button"
            tabIndex={0}
          >
            <IconThumbsUp />
            <Text>Yes</Text>
          </Button>
          <Button
            className="vote-button"
            onClick={onNoVote}
            aria-label="No"
            role="button"
            tabIndex={0}
          >
            <IconThumbsDown />
            <Text>No</Text>
          </Button>
          <Flex className="vote-response">
            <Text className="feedback-text">{c.voteResponse}</Text>
            <Flex className="no-vote-response">
              <Text className="cta">{c.noVoteCTA}</Text>
              <Button className="cta-button">
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
});

export default Feedback;
