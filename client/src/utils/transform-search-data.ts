import {parseURL} from "./url/url";
import {
  platformFilterMetadataByOption,
  frameworkFilterMetadataByOption,
} from "./filter-data";
import {setSearchResultCount} from "./track";

const filterMetadataByOption = {
  ...platformFilterMetadataByOption,
  ...frameworkFilterMetadataByOption,
} as const;

type FilterMetadataKey = keyof typeof filterMetadataByOption;

interface HighlightResult {
  value: string;
  matchedWords: string[];
  matchLevel: string;
  fullyHighlighted?: boolean;
}

export interface Item {
  anchor: string;
  content?: string;
  hierarchy: {
    lvl0?: string;
    lvl1?: string;
    lvl2?: string;
    lvl3?: string;
    lvl4?: string;
    lvl5?: string;
    lvl6?: string;
  };
  url: string;
  _highlightResult: {
    content: HighlightResult;
    hierarchy: {
      lvl0: HighlightResult;
      lvl1: HighlightResult;
      lvl2: HighlightResult;
      lvl3: HighlightResult;
    };
  };
}

export function transformData(items: Item[]): Item[] {
  setSearchResultCount(items.length);

  return items.map((item) => {
    const {params} = parseURL(item.url);
    const entries = Object.entries(params);
    if (entries.length > 0) {
      const filterMetadataKey = entries[0][1] as FilterMetadataKey | undefined;
      if (typeof filterMetadataKey === "string") {
        const label = filterMetadataByOption[filterMetadataKey].label;
        if (label && item?._highlightResult?.hierarchy?.lvl0) {
          const newHeading = `${item.hierarchy.lvl0} (${label})`;
          item.hierarchy.lvl0 = newHeading;
          item._highlightResult.hierarchy.lvl0.value = newHeading;
        }
      }
    }
    return item;
  });
}
