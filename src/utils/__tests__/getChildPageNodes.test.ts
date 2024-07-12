import { getChildPageNodes } from '../getChildPageNodes';

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

describe('getChildPageNodes', () => {
  it('should return the children of a non-root node when the route matches a non-root node', () => {
    const result = getChildPageNodes('/route1/route2');

    expect(result).toEqual([
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
    ]);
  });

  it('should return empty array when the route does not match any node in the directory', () => {
    const result = getChildPageNodes('/route1/route20');

    expect(result).toEqual([]);
  });

  it('should handle the case when the route is an empty string', () => {
    const result = getChildPageNodes('');

    expect(result).toEqual([]);
  });

  it('should return empty array when children array is empty or undefined', () => {
    const result = getChildPageNodes('/route1/route2/child2');

    expect(result).toEqual([]);
  });
});
