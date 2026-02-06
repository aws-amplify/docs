import { findDirectoryNode } from '../findDirectoryNode';

jest.mock(
  '@/directory/directory.json',
  () => {
    const mockDirectory = {
      title: 'Root',
      description: 'Root page',
      platforms: [],
      route: '/',
      children: [
        {
          title: 'Route 1 Route 2',
          description: 'Route 1 Route 2 page',
          platforms: [],
          route: '/route1/route2',
          children: [
            {
              title: 'Child 1',
              description: 'Child 1 page',
              platforms: [],
              route: '/route1/route2/child1',
              children: [
                {
                  title: 'Child 1 Child 1',
                  description: 'Child 1 Child 1 page',
                  platforms: [],
                  route: '/route1/route2/child1/child1'
                },
                {
                  title: 'Child 1 Child 2',
                  description: 'Child 1 Child 2 page',
                  platforms: [],
                  route: '/route1/route2/child1/child2'
                },
                {
                  title: 'Child 1 Child 3',
                  description: 'Child 1 Child 3 page',
                  platforms: [],
                  route: '/route1/route2/child1/child3'
                }
              ]
            },
            {
              title: 'Child 2',
              description: 'Child 2 page',
              platforms: [],
              route: '/route1/route2/child2'
            },
            {
              title: 'Child 3',
              description: 'Child 3 page',
              platforms: [],
              route: '/route1/route2/child3'
            }
          ]
        }
      ]
    };

    return {
      __esModule: true, 
      default: mockDirectory
    };
  },
  { virtual: true }
);

describe('findDirectoryNode', () => {
  it('should return directory page node if it exists', () => {
    const result = findDirectoryNode('/route1/route2/child1');

    expect(result).toEqual({
      title: 'Child 1',
      description: 'Child 1 page',
      platforms: [],
      route: '/route1/route2/child1',
      children: [
        {
          title: 'Child 1 Child 1',
          description: 'Child 1 Child 1 page',
          platforms: [],
          route: '/route1/route2/child1/child1'
        },
        {
          title: 'Child 1 Child 2',
          description: 'Child 1 Child 2 page',
          platforms: [],
          route: '/route1/route2/child1/child2'
        },
        {
          title: 'Child 1 Child 3',
          description: 'Child 1 Child 3 page',
          platforms: [],
          route: '/route1/route2/child1/child3'
        }
      ]
    });
  });

  it('should return undefined if page not is not found', () => {
    const result = findDirectoryNode('/route1/route2/child4');

    expect(result).toEqual(null);
  });
});
