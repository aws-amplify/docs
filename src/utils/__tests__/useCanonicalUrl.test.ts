import { renderHook } from '@testing-library/react';
import { useCanonicalUrl } from '../useCanonicalUrl';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      pathname: ''
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('useCanonicalUrl', () => {
  it('should set canonical url to javascript if the router.pathname exists in the canonical url list', () => {
    routerMock.useRouter = () => {
      return {
        pathname: '/[platform]/tools/cli/start/set-up-cli'
      };
    };

    const meta = {};

    const { result } = renderHook(() => useCanonicalUrl(meta, 'react'));

    expect(result.current).toEqual('/javascript/tools/cli/start/set-up-cli');
  });

  it('should use custom canonical Url for generic platform if it exists', () => {
    const meta = {
      platforms: [
        'javascript',
        'react-native',
        'flutter',
        'swift',
        'android',
        'angular',
        'nextjs',
        'react',
        'vue'
      ],
      canonicalUrl: '/[platform]/build-a-backend/auth/app-uninstall'
    };

    const { result } = renderHook(() => useCanonicalUrl(meta, 'react'));

    expect(result.current).toEqual('/react/build-a-backend/auth/app-uninstall');
  });

  it('should use the canonical object from the mdx if it exists', () => {
    const meta = {
      platforms: [
        'javascript',
        'react-native',
        'flutter',
        'swift',
        'android',
        'angular',
        'nextjs',
        'react',
        'vue'
      ],
      canonicalObjects: [
        {
          platforms: ['vue', 'angular', 'javascript'],
          canonicalPath: '/javascript/build-a-backend/auth/add-social-provider/'
        },
        {
          platforms: ['react', 'nextjs'],
          canonicalPath: '/react/build-a-backend/auth/add-social-provider/'
        }
      ]
    };

    const { result: reactResult } = renderHook(() =>
      useCanonicalUrl(meta, 'react')
    );
    const { result: vueResult } = renderHook(() =>
      useCanonicalUrl(meta, 'vue')
    );

    expect(reactResult.current).toEqual(
      '/react/build-a-backend/auth/add-social-provider/'
    );
    expect(vueResult.current).toEqual(
      '/javascript/build-a-backend/auth/add-social-provider/'
    );
  });
});
