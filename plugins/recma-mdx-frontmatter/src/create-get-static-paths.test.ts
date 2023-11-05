import * as assert from 'node:assert';
import * as test from 'node:test';
import { createGetStaticPaths } from './create-get-static-paths.js';
import type {
  DynamicRoutePart,
  DynamicRouteFrontmatterConfig
} from './dynamic-routes.js';

test.describe('createGetStaticPaths', () => {
  let frontmatter: Record<string, unknown> = {
    platforms: ['vue', 'react'],
    route: '/[platform]/getting-started'
  };
  let dynamicRoutes: Record<DynamicRoutePart, DynamicRouteFrontmatterConfig> = {
    platform: {
      key: 'platforms',
      values: ['vue', 'react']
    }
  };

  test.describe('route prop', () => {
    test.it('validates route prop existence', () => {
      const frontmatter: Record<string, unknown> = {
        platforms: ['vue', 'react']
      };
      assert.throws(
        () => createGetStaticPaths(frontmatter, dynamicRoutes),
        'Dynamic route params were found but "route" is not defined'
      );
    });
  });

  test.it('validates route prop', (t) => {
    const frontmatter: Record<string, unknown> = {
      route: ['vue', 'react']
    };
    assert.throws(
      () => createGetStaticPaths(frontmatter, dynamicRoutes),
      'Invalid type for frontmatter property "route"'
    );
  });

  test.it('validates associated route part frontmatter prop', () => {
    const frontmatter: Record<string, unknown> = {
      route: '/[platform]/getting-started'
    };
    const dynamicRoutes: Record<
      DynamicRoutePart,
      DynamicRouteFrontmatterConfig
    > = {
      platform: {
        key: 'platforms',
        values: ['vue', 'react']
      }
    };
    assert.throws(
      () => createGetStaticPaths(frontmatter, dynamicRoutes),
      'Dynamic route frontmatter property, "route", is defined, but dynamic route params are not found'
    );
  });

  test.it('validates route part prop values', (t) => {
    const frontmatter: Record<string, unknown> = {
      platforms: ['vue', 'react', 'angular'],
      route: '/[platform]/getting-started'
    };
    const dynamicRoutes: Record<
      DynamicRoutePart,
      DynamicRouteFrontmatterConfig
    > = {
      platform: {
        key: 'platforms',
        values: ['vue', 'react']
      }
    };
    assert.throws(
      () => createGetStaticPaths(frontmatter, dynamicRoutes)
      // 'Invalid value "angular" found for frontmatter "platforms"'
    );
  });

  test.todo('creates params for dynamic routes');
  test.todo('creates params for multi-part dynamic routes');
  test.todo('returns getStaticPaths program node');
});
