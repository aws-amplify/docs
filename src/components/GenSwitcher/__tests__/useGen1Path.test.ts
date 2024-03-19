import { renderHook } from '@testing-library/react';
import { useGen1Path } from '../useGen1Path';

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

describe('useGenSwitcherPath', () => {
  it('should return /gen1 if path does not exist on gen1', async () => {
    routerMock.useRouter = () => {
      return {
        pathname: '/[platform]/start/quickstart/vite-react-app/'
      };
    };

    flatDirectoryMock['/gen1/[platform]/start/quickstart/vite-react-app/'] = {
      path: 'src/pages/gen1/[platform]/start/quickstart/vite-react-app/index.mdx',
      platforms: ['react'],
      route: '/gen1/[platform]/start/quickstart/vite-react-app/'
    };

    const { result } = renderHook(() => useGen1Path('react'));

    expect(result.current).toEqual('/gen1');
  });

  it('should return similar gen1 path if path exists on gen1', async () => {
    routerMock.useRouter = () => {
      return {
        query: { platform: 'react' },
        pathname: '/[platform]/build-a-backend/auth/set-up-auth/'
      };
    };

    flatDirectoryMock['/gen1/[platform]/build-a-backend/auth/set-up-auth/'] = {
      path: 'src/pages/gen1/[platform]/build-a-backend/auth/set-up-auth/index.mdx',
      platforms: ['react'],
      route: '/gen1/[platform]/build-a-backend/auth/set-up-auth/'
    };

    const { result } = renderHook(() => useGen1Path('react'));

    expect(result.current).toEqual({
      pathname: '/gen1/[platform]/build-a-backend/auth/set-up-auth/',
      query: { platform: 'react' }
    });
  });
});
