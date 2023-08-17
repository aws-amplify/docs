import { useCallback, useEffect, useRef, useState } from 'react';
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

export default function Feedback({ footerRef, contentsRef, feedbackRef }) {
  const [state, setState] = useState(FeedbackState.START);
  const containerRef = useRef<HTMLDivElement>(null);
  const [componentX, setComponentX] = useState('');

  useEffect(() => {
    const footer = footerRef.current;
    const feedback = feedbackRef?.current;
    setComponentX(contentsRef.current != null ? 'visibleToc' : 'noToc');

    if (typeof window !== 'undefined') {
      window.addEventListener('touchmove', hideFeedback);
      window.addEventListener('scroll', hideFeedback);

      let prevScrollPos = window.scrollY;

      // eslint-disable-next-line no-inner-declarations
      function hideFeedback() {
        // Scroll variables and calculations
        const currPos = window.scrollY,
          footerBuffer = 50,
          footerVisible =
            document.body.scrollHeight - footer.offsetHeight + footerBuffer <=
            currPos + window.innerHeight,
          scrollUp = prevScrollPos >= currPos,
          scrollDown = prevScrollPos < currPos,
          container = containerRef.current,
          feedbackVisible = feedback.offsetTop - currPos < window.innerHeight;

        if (
          container &&
          ((scrollUp && footerVisible) ||
            (scrollUp && feedbackVisible) ||
            (scrollDown && currentState != FeedbackState.DOWN) ||
            (scrollDown && footerVisible)) &&
          !container.classList.contains('close')
        ) {
          container.classList.remove('slideIn');
          container.classList.add('slideOut');
          container.ariaHidden = 'true';
        } else if (
          container &&
          scrollUp &&
          !container.classList.contains('close') &&
          feedback.children.item(0).id == 'start-state'
        ) {
          container.classList.remove('initial');
          container.classList.remove('slideOut');
          container.classList.add('slideIn');
          container.ariaHidden = 'false';
        }
        prevScrollPos = currPos;
      }
    }
  }, [componentX]);

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
    e.preventDefault();
    trackFeedbackSubmission(true);
    currentState = FeedbackState.UP;
    setState(currentState);
    feedbackRef?.current?.classList.add('hide');
  }, []);

  const onNoVote = useCallback((e) => {
    e.preventDefault();
    trackFeedbackSubmission(false);
    currentState = FeedbackState.DOWN;
    setState(currentState);
    feedbackRef?.current?.classList.add('hide');
  }, []);

  const close = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.classList.add('close'),
        containerRef.current.classList.remove('slideIn'),
        (containerRef.current.ariaHidden = 'true');
    }
  }, []);

  return (
    <FeedbackContainer
      id="feedback-container"
      ref={containerRef}
      className={state + ' initial ' + componentX}
      aria-hidden={state == FeedbackState.UP ? true : false}
    >
      <div className="sizing" aria-hidden="true">
        {c.yesVoteResponse}
      </div>
      <div className="sizing" aria-hidden="true">
        {c.noVoteResponse}
      </div>
      <div className="sizing" aria-hidden="true">
        {c.feedbackQuestion}
      </div>

      {(() => {
        switch (state) {
          case 'START':
            return (
              <div aria-label={c.feedbackQuestion} tabIndex={0}>
                <FeedbackText>{c.feedbackQuestion}</FeedbackText>
                <VoteButtonsContainer>
                  <VoteButton
                    href="#"
                    onClick={onYesVote}
                    aria-label="Yes"
                    role="button"
                    tabIndex={0}
                  >
                    <ThumbsUpIcon />
                  </VoteButton>
                  <Divider />
                  <VoteButton
                    href="#"
                    onClick={onNoVote}
                    aria-label="No"
                    role="button"
                    tabIndex={0}
                  >
                    <ThumbsDownIcon />
                  </VoteButton>
                  <Divider />
                  <CloseIcon onClick={close} />
                </VoteButtonsContainer>
              </div>
            );
          case 'UP':
            return (
              <div>
                <FeedbackText>{c.yesVoteResponse}</FeedbackText>
                <VoteButtonsContainer className="up">
                  <ThumbsUpFilledIcon />
                  <Divider />
                  <ThumbsDownIcon />
                </VoteButtonsContainer>
                <VoteButtonReplace>
                  <ThumbsUpFilledIcon />
                </VoteButtonReplace>
              </div>
            );
          case 'DOWN':
            return (
              <div>
                <div className="response">
                  <FeedbackText>{c.noVoteResponse}</FeedbackText>
                  <VoteButtonsContainer className="down">
                    <ThumbsUpIcon />
                    <Divider />
                    <ThumbsDownFilledIcon />
                  </VoteButtonsContainer>
                </div>
                <div className="expanding-section">
                  <div className="cta">
                    <p>{c.noVoteCTA}</p>
                    <CloseIcon onClick={close} />
                  </div>
                  <ButtonStyles>
                    <ExternalLink href={c.buttonLink} icon={true}>
                      {c.noVoteCTAButton}
                    </ExternalLink>
                  </ButtonStyles>
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
