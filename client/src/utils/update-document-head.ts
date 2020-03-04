import {Build} from "@stencil/core";
import {Page} from "../api";

export const updateDocumentHead = (page: Page): void => {
  const title = `Amplify Docs –– ${page.title}`;
  document.title = title;
  if (Build.isBrowser) {
    const meta = document.getElementsByTagName("meta");
    meta.namedItem("description")?.setAttribute("content", title);
    meta.namedItem("description")?.setAttribute("content", page.description);
  }
};
