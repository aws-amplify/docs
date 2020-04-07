export interface ParsedURL {
  base: string;
  hash: string;
  params: Record<string, string>;
}

// const parsedCache = new Map<string, ParsedURL>();

export const parseURL = (path: string): ParsedURL => {
  // const fromCache = parsedCache.get(path);
  // if (fromCache) {
  //   return fromCache;
  // }

  const pieces = path.split("/q/");

  let search = "";
  let base = "";
  let query = "";
  let hash = "";
  const params = {};

  if (pieces.length == 2) {
    search = pieces.pop() as string;
  }

  base = pieces.pop() as string;

  if (search) {
    const searchSplit = search.split("#");

    if (searchSplit.length === 2) {
      query = searchSplit.shift() as string;
      hash = `#${searchSplit.shift() as string}`;
    } else if (search.includes("#")) {
      hash = search;
    } else {
      query = search;
    }

    if (query !== "") {
      const searchPiecesSplit = query.split("/");
      for (let i = 0; i < searchPiecesSplit.length / 2; i += 1) {
        params[searchPiecesSplit[i]] = searchPiecesSplit[i + 1];
      }
    }
  }

  const parsed = {
    base,
    hash,
    params,
  };

  // parsedCache.set(path, parsed);

  return parsed;
};

const serializedCache = new Map<string, string>();

export const serializeURL = (pieces: ParsedURL): string => {
  const key = pieces.toString();

  const fromCache = serializedCache.get(key);
  if (fromCache) {
    return fromCache;
  }

  let serialized = pieces.base;

  const paramEntries = Object.entries(pieces.params);

  if (paramEntries.length) {
    serialized += `/q/${paramEntries
      .map(([paramKey, paramValue]) => `${paramKey}/${paramValue}`)
      .join("/")}`;
  }

  if (pieces.hash) {
    serialized += `#${pieces.hash}`;
  }

  serializedCache.set(key, serialized);

  // console.log(pieces, serialized);

  return serialized;
};
