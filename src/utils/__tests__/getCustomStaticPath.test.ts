import { getCustomStaticPath } from '../getCustomStaticPath';

describe('getCustomStaticPath', () => {
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
});
