export interface ParsedURL {
  path: string;
  hash: string;
  params: Record<string, string>;
}

export const parseURL = (url: string): ParsedURL => {
  const {pathname, hash} = new URL(url, location.origin);
  const pieces = pathname.split("/q/");

  let search = "";
  let path = "";
  const params = {};

  if (pieces.length == 2) {
    search = pieces.pop() as string;
  }

  path = pieces.pop() as string;

  if (search) {
    const searchPiecesSplit = search.split("/");
    for (let i = 0; i < searchPiecesSplit.length / 2; i += 2) {
      params[searchPiecesSplit[i]] = searchPiecesSplit[i + 1];
    }
  }

  const parsed = {
    path,
    hash,
    params,
  };

  return parsed;
};

export const serializeURL = (pieces: ParsedURL): string => {
  let serialized = pieces.path;

  const paramEntries = Object.entries(pieces.params);

  if (paramEntries.length) {
    serialized += `/q/${paramEntries
      .map(([paramKey, paramValue]) => `${paramKey}/${paramValue}`)
      .join("/")}`;
  }

  if (pieces.hash) {
    serialized += pieces.hash;
  }

  return serialized;
};
