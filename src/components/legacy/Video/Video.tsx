import { useState, useEffect, useRef } from 'react';
import { View } from '@aws-amplify/ui-react';

interface VideoProps {
  description: string;
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
 */
export const Video = ({
  description,
  autoPlay = true,
  muted = true,
  loop = true,
  src,
  testId,
  ...rest
}: VideoProps) => {
  if (!description) {
    throw new Error(
      `<Video ${src}="../../.."> is missing required description prop`
    );
  }
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
      aria-label={description}
      testId={testId}
      {...rest}
    >
      <source src={src} />
    </View>
  );
};
