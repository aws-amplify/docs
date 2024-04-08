import { renderHook } from '@testing-library/react';
import { useIsGen1Page } from '../useIsGen1Page';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      asPath: '/gen1'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('useIsGen1Page', () => {
  it('should return true when the path is /gen1', () => {
    const { result } = renderHook(() => useIsGen1Page());

    expect(result.current).toBe(true);
  });

  it('should return false when the path is not /gen1', () => {
    routerMock.useRouter = () => {
      return {
        asPath: '/'
      };
    };

    const { result } = renderHook(() => useIsGen1Page());

    expect(result.current).toBe(false);
  });
});
