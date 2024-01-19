import { renderHook } from '@testing-library/react';
import { useVersionSwitchPath } from '../useVersionSwitchPath';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      pathname: ''
    };
  }
};

jest.mock('next/router', () => routerMock);

const flatDirectoryMock = {};

jest.mock('@/directory/flatDirectory.json', () => flatDirectoryMock);

describe('useVersionSwitchPath', () => {
  it('should replace "/[platform]" with "/[platform]/prev" when isPrev is false', () => {
    routerMock.useRouter = () => {
      return {
        pathname: '/[platform]/build-a-backend/auth/set-up-auth'
      };
    };

    flatDirectoryMock['/[platform]/prev/build-a-backend/auth/set-up-auth'] = {
      path: 'src/pages/[platform]/prev/build-a-backend/auth/set-up-auth/index.mdx',
      platforms: ['react'],
      route: '/[platform]/prev/build-a-backend/auth/set-up-auth'
    };

    const { result } = renderHook(() => useVersionSwitchPath('react', false));

    expect(result.current).toEqual(
      '/[platform]/prev/build-a-backend/auth/set-up-auth'
    );
  });

  it('should replace "/[platform]/prev" with "/[platform]" when isPrev is true', () => {
    routerMock.useRouter = () => {
      return {
        pathname: '/[platform]/prev/build-a-backend/auth/set-up-auth'
      };
    };

    flatDirectoryMock['/[platform]/build-a-backend/auth/set-up-auth'] = {
      path: 'src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx',
      platforms: ['react'],
      route: '/[platform]/build-a-backend/auth/set-up-auth'
    };

    const { result } = renderHook(() => useVersionSwitchPath('react', true));

    expect(result.current).toEqual(
      '/[platform]/build-a-backend/auth/set-up-auth'
    );
  });

  it('should not return the newRoute if the provided platform is not included in pageNode.platforms', () => {
    routerMock.useRouter = () => {
      return {
        pathname: '/[platform]/prev/build-a-backend/auth/set-up-auth'
      };
    };

    flatDirectoryMock['/[platform]/build-a-backend/auth/set-up-auth'] = {
      path: 'src/pages/[platform]/build-a-backend/auth/set-up-auth/index.mdx',
      platforms: ['react'],
      route: '/[platform]/build-a-backend/auth/set-up-auth'
    };

    const { result } = renderHook(() => useVersionSwitchPath('angular', true));

    expect(result.current).toEqual(undefined);
  });
});
