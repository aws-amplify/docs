import { View } from '@aws-amplify/ui-react';

interface VideoProps {
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  src: string;
}

export const Video = ({
  src,
  loop,
  autoPlay,
  muted,
  controls = true,
  ...rest
}: VideoProps) => {
  return src ? (
    <View
      src={src}
      className="video"
      as="video"
      loop={loop}
      autoPlay={autoPlay}
      muted={muted}
      controls={controls}
      {...rest}
    />
  ) : null;
};
