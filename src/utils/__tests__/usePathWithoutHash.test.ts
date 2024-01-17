import { usePathWithoutHash } from '../usePathWithoutHash';
import { renderHook } from '@testing-library/react';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      asPath: ''
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('usePathWithoutHash', () => {
  it('should remove the hashmark and everything after it from the url', () => {
    routerMock.useRouter = () => {
      return {
        asPath:
          'https://docs.amplify.aws/react/build-a-backend/graphqlapi/set-up-graphql-api/#add-your-first-record'
      };
    };

    const { result } = renderHook(() => usePathWithoutHash());

    expect(result.current).toEqual(
      'https://docs.amplify.aws/react/build-a-backend/graphqlapi/set-up-graphql-api/'
    );
  });

  it('should not modify url if there are no hashmarks', () => {
    routerMock.useRouter = () => {
      return {
        asPath:
          'https://docs.amplify.aws/react/build-a-backend/graphqlapi/set-up-graphql-api/'
      };
    };

    const { result } = renderHook(() => usePathWithoutHash());

    expect(result.current).toEqual(
      'https://docs.amplify.aws/react/build-a-backend/graphqlapi/set-up-graphql-api/'
    );
  });
});
