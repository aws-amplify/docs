import { renderHook } from '@testing-library/react';
import { useCurrentPlatform } from '../useCurrentPlatform';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: {
        platform: ''
      }
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('useCurrentPlatform', () => {
  it('should return the current platform based on the query object', () => {
    routerMock.useRouter = () => {
      return {
        query: {
          platform: 'react'
        }
      };
    };

    const { result } = renderHook(() => useCurrentPlatform());

    expect(result.current).toEqual('react');
  });
});
