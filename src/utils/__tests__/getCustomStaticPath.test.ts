import { getCustomStaticPath } from '../getCustomStaticPath';
import { PLATFORMS } from '@/data/platforms';

describe('getCustomStaticPath', () => {
  it('should handle a single platform string', () => {
    const result = getCustomStaticPath('angular');

    expect(result).toEqual({
      paths: [{ params: { platform: 'angular' } }],
      fallback: false
    });
  });

  it('should handle multiple platforms as an array', () => {
    const result = getCustomStaticPath(['angular', 'flutter']);

    expect(result).toEqual({
      paths: [
        { params: { platform: 'angular' } },
        { params: { platform: 'flutter' } }
      ],
      fallback: false
    });
  });

  it('should handle the "all" platforms string', () => {
    const result = getCustomStaticPath('all');

    expect(result).toEqual({
      paths: PLATFORMS.map((platform) => ({ params: { platform } })),
      fallback: false
    });
  });
});
