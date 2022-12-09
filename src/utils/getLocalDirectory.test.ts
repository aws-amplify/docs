import { isProductRoot } from './getLocalDirectory';

describe('isProductRoot', () => {
  it('returns true when path is in root directory', () => {
    expect(isProductRoot('/ui')).toEqual(true);
  });

  it('returns false when path is not in root directory', () => {
    expect(isProductRoot('/not-existing')).toEqual(false);
  });

  it('returns true when the second path is q', () => {
    expect(isProductRoot('/ui/q/framework/react')).toEqual(true);
  });

  it('returns true when the second path starts with #', () => {
    expect(isProductRoot('/cli/#key-capabilities')).toEqual(true);
  });

  it('returns false when not root path', () => {
    expect(isProductRoot('/a/b/c')).toEqual(false);
  });
});
