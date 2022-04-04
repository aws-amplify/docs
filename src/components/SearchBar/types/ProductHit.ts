import { Hit } from '@algolia/client-search';

export type ProductRecord = {
  heading: string;
  title: string;
  content: string;
  description: string;
  slug: string;
  depth: number;
  hierarchicalCategories: {
    lvl0: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
    lvl4?: string;
    lvl5?: string;
    lvl6?: string;
  };
};

type WithAutocompleteAnalytics<THit> = THit & {
  __autocomplete_indexName: string;
  __autocomplete_queryID: string;
};

export type ProductHit = WithAutocompleteAnalytics<Hit<ProductRecord>>;
