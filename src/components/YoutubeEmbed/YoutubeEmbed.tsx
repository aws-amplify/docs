type YoutubeEmbedProps = {
  src: string;
};

export function YoutubeEmbed({ src }: YoutubeEmbedProps) {
  return (
    <iframe
      sandbox="allow-scripts allow-same-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      src={src}
    ></iframe>
  );
}
