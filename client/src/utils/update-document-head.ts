import {Build} from "@stencil/core";
import {Page} from "../api";

export const updateDocumentHead = (page: Page): void => {
  let title = ""
  if (page.route === "/") {
    title = "Amplify Framework Docs"
  } else {
    title = page.sectionTitle
      ? `${page.sectionTitle} - ${page.title} - Amplify Docs`
      : `${page.title} - Amplify Docs`
  }
  document.title = title;

  if (Build.isBrowser) {
    const meta = document.getElementsByTagName("meta");
    meta.namedItem("description")?.setAttribute("content", title);
    meta.namedItem("description")?.setAttribute("content", page.description);
  }
};
