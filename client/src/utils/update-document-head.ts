import {Page} from "../api";

export const updateDocumentHead = (page: Page): void => {
  const title = `Amplify Docs –– ${page.title}`;
  document.title = title;
};
