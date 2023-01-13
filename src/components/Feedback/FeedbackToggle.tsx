import { useCallback, useEffect, useState, useRef } from 'react';
import Feedback from './Feedback';
import { Toggle, FeedbackMobileContainer } from './styles';

export default function FeedbackToggle() {
  const [inView, setInView] = useState(false);
  const feedbackContainer = useRef(null);

  const toggleView = useCallback(() => {
    if (inView) {
      setInView(false);
    } else {
      setInView(true);
    }
  }, [inView]);

  const handleClickOutside: EventListenerOrEventListenerObject = (event) => {
    if (feedbackContainer?.current?.contains(event.target)) {
      // inside click
      return;
    }
    // outside click
    setInView(false);
  };

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
      <Toggle onClick={toggleView}>
        <img src="/assets/thumbs-up.svg" alt="Thumbs up" />
        <img src="/assets/thumbs-down.svg" alt="Thumbs down" />
      </Toggle>
    </div>
  );
}
