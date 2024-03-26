import { View } from '@aws-amplify/ui-react';

interface VideoProps {
  autoPlay?: boolean;
  muted?: boolean;
  loop?: true;
  src: string;
  description?: string;
}

export const Video = ({
  autoPlay = true,
  muted = true,
  loop = true,
  src,
  ...rest
}: VideoProps) => {
  return (
    <>
      <View
        as="video"
        className="video"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        width="100%"
        playsInline={true}
        controls={true}
        {...rest}
        aria-label="Configuring AWS Amplify"
        aria-describedby="videoDescription"
      >
        <source src={src} />
      </View>
      <p id="videoDescription">Some video description text</p>
    </>
  );
};
