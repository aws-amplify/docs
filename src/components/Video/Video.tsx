import { useState, useEffect, useRef } from 'react';
import { View } from '@aws-amplify/ui-react';

interface VideoProps {
  autoPlay?: boolean;
  muted?: boolean;
  loop?: true;
  src: string;
  testId?: string;
}

export const reducedMotionMediaQuery =
  '(prefers-reduced-motion: no-preference)';

/**
 * @description The Video component defaults to a muted, auto play video.
 * Currently, we also assume the surrounding content will adequately describe
 * the video so we default to aria-hidden="true".
 */
export const Video = ({
  autoPlay = true,
  muted = true,
  loop = true,
  src,
  testId,
  ...rest
}: VideoProps) => {
  /**
   * Assume user prefers reduced motion until we can check
   * in the useEffect for the media query match, otherwise Next SSG
   * will consider 'window' undefined.
   */
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(reducedMotionMediaQuery);

    setPrefersReducedMotion(!mediaQueryList.matches);

    const mediaQueryListener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener('change', mediaQueryListener);
    return () => {
      mediaQueryList.removeEventListener('change', mediaQueryListener);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      videoRef?.current?.pause();
    } else {
      if (autoPlay) {
        videoRef?.current?.play();
      }
    }
  }, [prefersReducedMotion, autoPlay]);

  return (
    <View
      ref={videoRef}
      as="video"
      className="video"
      muted={muted}
      loop={loop}
      width="100%"
      playsInline={true}
      controls={true}
      aria-hidden="true"
      testId={testId}
      {...rest}
    >
      <source src={src} />
    </View>
  );
};
