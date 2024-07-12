import { findDirectoryNode } from '../findDirectoryNode';

jest.mock(
  '@/directory/directory.json',
  () => {
    const mockDirectory = {
      route: '/',
      children: [
        {
          route: '/route1/route2',
          children: [
            {
              route: '/route1/route2/child1',
              children: [
                {
                  route: '/route1/route2/child1/child1'
                },
                {
                  route: '/route1/route2/child1/child2'
                },
                {
                  route: '/route1/route2/child1/child3'
                }
              ]
            },
            {
              route: '/route1/route2/child2'
            },
            {
              route: '/route1/route2/child3'
            }
          ]
        }
      ]
    };

    return mockDirectory;
  },
  { virtual: true }
);

describe('findDirectoryNode', () => {
  it('should return directory page node if it exists', () => {
    const result = findDirectoryNode('/route1/route2/child1');

    expect(result).toEqual({
      route: '/route1/route2/child1',
      children: [
        {
          route: '/route1/route2/child1/child1'
        },
        {
          route: '/route1/route2/child1/child2'
        },
        {
          route: '/route1/route2/child1/child3'
        }
      ]
    });
  });

  it('should return undefined if page not is not found', () => {
    const result = findDirectoryNode('/route1/route2/child4');

    expect(result).toEqual(undefined);
  });
});
