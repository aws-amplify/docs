import {
  ParsedURL,
  parseURL as parseURLSync,
  serializeURL as serializeURLSync,
} from "./url";

export const parseURL = async (url: string): Promise<ParsedURL> => {
  return parseURLSync(url);
};

export const serializeURL = async (pieces: ParsedURL): Promise<string> => {
  return serializeURLSync(pieces);
};
