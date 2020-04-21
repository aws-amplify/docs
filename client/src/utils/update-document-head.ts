import {Build} from "@stencil/core";
import {Page} from "../api";

const ROOT_TITLE = "Amplify Framework Docs";
const BASE_PAGE_TITLE = "Amplify Docs";

function getPageTitle(page) {
  if (page.title) {
    if (page.sectionTitle) {
      return `${page.sectionTitle} - ${page.title} - ${BASE_PAGE_TITLE}`;
    }
    return `${page.title} - ${BASE_PAGE_TITLE}`;
  }
  return BASE_PAGE_TITLE;
}

export const updateDocumentHead = (page: Page): void => {
  let title = "";
  if (page.route === "/") {
    title = ROOT_TITLE;
  } else {
    title = getPageTitle(page);
  }
  document.title = title;

  if (Build.isBrowser) {
    const meta = document.getElementsByTagName("meta");
    meta.namedItem("description")?.setAttribute("content", title);
    meta.namedItem("description")?.setAttribute("content", page.description);
  }
};
