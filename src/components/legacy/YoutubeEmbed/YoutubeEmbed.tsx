type YoutubeEmbedProps = {
  /** Embed Id for the Youtube video. Can include specific start time */
  embedId: string;

  /** Width of the Youtube embed */
  width?: string;

  /** Height of the Youtube embed */
  height?: string;
};

export function YoutubeEmbed({
  embedId,
  width = '560',
  height = '315'
}: YoutubeEmbedProps) {
  const styles = {
    '--youtube-embed-width': width,
    '--youtube-embed-height': height
  } as React.CSSProperties;

  return (
    <iframe
      style={styles}
      sandbox="allow-scripts allow-same-origin allow-popups"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      src={`https://www.youtube-nocookie.com/embed/${embedId}`}
      title="YouTube video player"
      className="youtube-embed"
    ></iframe>
  );
}
