import { fromJs } from 'esast-util-from-js';
import type { Program } from 'estree';
import type {
  DynamicRoutePart,
  DynamicRouteFrontmatterConfig
} from './dynamic-routes.js';
import type { GetStaticPathsResult } from 'next';

/**
 * Create `getStaticPaths` ESAST program node
 * @param frontmatter parsed frontmatter object
 * @param dynamicRoutes dynamic route config
 * @returns getStaticProps ESAST program node
 */
export function createGetStaticPaths(
  frontmatter: Record<string, unknown>,
  dynamicRoutes: Record<DynamicRoutePart, DynamicRouteFrontmatterConfig>
): Program | null {
  const frontmatterParams: Record<string, unknown[]> = {};
  for (const [routePart, config] of Object.entries(dynamicRoutes)) {
    const key = config.key || routePart;
    const fm = frontmatter[key];
    if (fm && Array.isArray(fm)) {
      // first check to see if frontmatter contains any invalid values
      let invalidValue = undefined;
      const isContainsInvalidValue = fm.some((value) => {
        // this is a bit extra, but allows us to print a helpful error with the invalid value
        const isContainsInvalid = !config.values.includes(value);
        if (isContainsInvalid) invalidValue = value;
        return isContainsInvalid;
      });
      if (isContainsInvalidValue) {
        throw new Error(
          `Invalid value "${invalidValue}" found for frontmatter "${key}"`
        );
      }
      // then collect the getStaticPaths params
      // `["platform", ["vue", "javascript"]]`
      if (frontmatterParams[routePart]) {
        throw new Error(
          `Duplicate route part "${routePart}" found in frontmatter`
        );
      }
      frontmatterParams[routePart] = fm;
    }
  }

  const isFrontmatterParamsEmpty = Object.keys(frontmatterParams).length === 0;

  // exit without getSaticPaths if no dynamic route parts found
  if (isFrontmatterParamsEmpty && !frontmatter.route) {
    return null;
  }
  // error if "route" is set but dynamic route parts are not found
  if (frontmatter.route && isFrontmatterParamsEmpty) {
    throw new Error(
      'Dynamic route frontmatter property, "route", is defined, but dynamic route params are not found. Either set the dynamic route params, remove the "route" property, or update the `recmaMdxFrontmatter` config with the new route params'
    );
  }
  // error if params were found but "route" fm prop was not
  if (!isFrontmatterParamsEmpty && !frontmatter.route) {
    throw new Error(
      'Dynamic route params were found but "route" is not defined. Please define "route" in your MDX file that follows the convention of the route: `/[platform]/getting-started`'
    );
  }

  if (typeof frontmatter.route !== 'string') {
    throw new Error(
      'Invalid type for frontmatter property "route". "route" should be defined as a string'
    );
  }

  /**
   * @example "/[platform]/getting-started"
   * @example "/[platform]/[language]/getting-started"
   */
  const routeTemplate: string = frontmatter.route;
  const routeTemplateParts = routeTemplate.split('/').filter(Boolean);

  const params: Record<string, string>[] = [];
  for (const part of routeTemplateParts) {
    // validate route template parts
    if (part.startsWith('[') && part.endsWith(']')) {
      if (part.length === 2) {
        throw new Error('Invalid part in route template. Part cannot be empty');
      }
      const partContent = part.slice(1, -1);
      const isPartContentValid = !!frontmatterParams[partContent];
      if (!isPartContentValid) {
        throw new Error(
          `Invalid part in route template. Part "${partContent}" is not defined in dynamic route params`
        );
      }

      for (const value of frontmatterParams[partContent]) {
        const param = {
          [partContent]: value as string
        };
        params.push(param);
      }
    }
  }

  const result: GetStaticPathsResult = {
    fallback: false,
    paths: params.map((param) => ({
      params: param
    }))
  };

  const getStaticPaths = fromJs(
    `
    export const getStaticPaths = async () => {
      return ${JSON.stringify(result)}
    }
    `,
    {
      module: true
    }
  );
  return getStaticPaths;
}
