import {getPage as capiGetPage} from "./api/get-page";
import {Page} from "./api/types/page";

export const pages = new Map<string, Promise<Page> | undefined>();

export const getPage = async (route: string) => {
  let promise = pages.get(route);
  if (!promise) {
    promise = capiGetPage(route);
    pages.set(route, promise);
  }
  return promise;
};
