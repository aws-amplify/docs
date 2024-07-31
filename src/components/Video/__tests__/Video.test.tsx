import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Video, reducedMotionMediaQuery } from '../Video';

function mockMatchMedia(
  mediaQuery: string = '',
  matches: boolean = false
): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string = mediaQuery) => ({
      matches: matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }))
  });
}

// Mock HTMLMediaElement.prototype.pause
jest
  .spyOn(window.HTMLMediaElement.prototype, 'pause')
  .mockImplementation(() => {});

const playSpy = jest
  .spyOn(window.HTMLMediaElement.prototype, 'play')
  .mockImplementation(() => Promise.resolve());

describe('Video', () => {
  const testId = 'videoTest';
  const component = (
    <Video
      src="test-video.mp4"
      ariaDescription="Video - Test"
      testId={testId}
    ></Video>
  );

  beforeEach(() => {
    mockMatchMedia('');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render video component', async () => {
    render(component);
    const video = screen.getByTestId(testId);
    expect(video).toBeInTheDocument();
  });

  it('should auto play video when prefers reduced motion (no preference) is true', async () => {
    mockMatchMedia(reducedMotionMediaQuery, true);
    render(component);
    const video = screen.getByTestId(testId);
    expect(video).toBeInTheDocument();
    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it('should not auto play video when prefers reduced motion (no preference) is false', async () => {
    mockMatchMedia(reducedMotionMediaQuery, false);
    render(component);
    const video = screen.getByTestId(testId);
    expect(video).toBeInTheDocument();
    expect(playSpy).toHaveBeenCalledTimes(0);
  });
});
