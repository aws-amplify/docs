import * as c from "./api";

export const pages = new Map<string, Promise<c.Page> | undefined>();

export const getPage = (route: string) => {
  let promise = pages.get(route);
  if (!promise) {
    promise = c.getPage(route);
    pages.set(route, promise);
  }
  return promise;
};
