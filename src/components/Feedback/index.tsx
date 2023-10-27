import { forwardRef, useCallback, useState } from 'react';
import {
  FeedbackContainer,
  VoteButton,
  VoteButtonAfter,
  VoteButtonsContainer,
  FeedbackText,
  FeedbackTextAfter,
  ButtonStyles
} from './styles';
import { trackFeedbackSubmission } from '../../utils/track';
import {
  IconThumbsUp,
  IconThumbsDown,
  ThumbsUpFilledIcon,
  ThumbsDownFilledIcon
} from '../Icons';
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
    const yesButtonText = e.currentTarget.children[1];
    const noButton = yesButton.nextSibling;
    const yesFeedbackText = noButton.nextSibling;
    const feedbackComponent = yesButton.parentElement.parentElement;
    const feedbackText = feedbackComponent.getElementsByTagName('p')[0];
    const feedbackTextWidth = feedbackText.offsetWidth;

    console.log(yesFeedbackText);

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
        transform: 'translateX(1000px)'
      },
      {
        opacity: 1,
        transform: 'translate(0)',
        overflow: 'visible'
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
      { transform: 'translateX(-50px)', opacity: 0 }
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

    // setTimeout(function () {
    //   currentState = FeedbackState.UP;
    //   setState(currentState);
    // }, 3000);
  }, []);

  const onNoVote = useCallback((e) => {
    // trackFeedbackSubmission(false);
    const feedbackContent = e.currentTarget.parentNode.parentNode;

    feedbackContent.classList.add('fadeOut');

    setTimeout(function () {
      currentState = FeedbackState.DOWN;
      feedbackContent.classList.remove('fadeOut');
      feedbackContent.classList.add('fadeIn');
      setState(currentState);
    }, 3000);
  }, []);

  return (
    <Flex
      id="feedback-container"
      ref={ref}
      aria-hidden={state == FeedbackState.UP ? true : false}
    >
      {(() => {
        switch (state) {
          case 'START':
            return (
              <div
                id="start-state"
                aria-label={c.feedbackQuestion}
                tabIndex={0}
              >
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
                  <Text className="feedback-text up-response">
                    {c.yesVoteResponse}
                  </Text>
                </Flex>
              </div>
            );
          case 'UP':
            return (
              <div className="up">
                <Flex className="vote-buttons-container up-response">
                  <Button className="vote-button up-response">
                    <ThumbsUpFilledIcon />
                  </Button>
                  <Text className="feedback-text up-response">
                    {c.yesVoteResponse}
                  </Text>
                </Flex>
              </div>
            );
          case 'DOWN':
            return (
              <div className="down">
                <View className="vote-buttons-container down-response">
                  <Button className="vote-button down-response">
                    <ThumbsDownFilledIcon />
                  </Button>
                  <Text className="feedback-text down-response">
                    {c.noVoteResponse}
                  </Text>
                </View>
                <Text className="cta">{c.noVoteCTA}</Text>
                <View className="button-styles">
                  <ExternalLink href={c.buttonLink} icon={true}>
                    {c.noVoteCTAButton}
                  </ExternalLink>
                </View>
              </div>
            );
          default:
            return <div></div>;
        }
      })()}
    </Flex>
  );
});

export default Feedback;
