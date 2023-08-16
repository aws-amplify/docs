type YoutubeEmbedProps = {
  src: string;
  width?: string;
  height?: string;
};

export function YoutubeEmbed({
  src,
  width = '560',
  height = '315'
}: YoutubeEmbedProps) {
  return (
    <iframe
      width={width}
      height={height}
      sandbox="allow-scripts allow-same-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      src={src}
    ></iframe>
  );
}
