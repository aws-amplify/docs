import { renderHook } from '@testing-library/react';
import { useVersionSwitcherPath } from '../useVersionSwitcherPath';

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

describe('useVersionSwitcherPath', () => {
  it('should replace "/[platform]" with "/[platform]/prev" when not on prev route', () => {
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

    const { result } = renderHook(() => useVersionSwitcherPath('react'));

    expect(result.current).toEqual(
      '/[platform]/prev/build-a-backend/auth/set-up-auth'
    );
  });

  it('should replace "/[platform]/prev" with "/[platform]" when on prev route', () => {
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

    const { result } = renderHook(() => useVersionSwitcherPath('react'));

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

    const { result } = renderHook(() => useVersionSwitcherPath('angular'));

    expect(result.current).toEqual(undefined);
  });
});
