import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { YoutubeEmbed } from '../index';

describe('YoutubeEmbed', () => {
  const embedId = 'uaG2mMYLI68';
  const component = <YoutubeEmbed embedId={embedId} />;
  it('should render the YoutubeEmbed component', async () => {
    render(component);
    const iframe = await screen.getByTitle('YouTube video player');
    expect(iframe).toBeInTheDocument();
  });

  it('should be sized to 560w by 315h', async () => {
    render(component);
    const iframe = await screen.getByTitle('YouTube video player');
    expect(iframe.getAttribute('style')).toEqual(
      '--youtube-embed-width: 560; --youtube-embed-height: 315;'
    );
  });
});
