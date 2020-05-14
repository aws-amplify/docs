import {Page} from "../api";

const ROOT_TITLE = "Amplify Framework Docs";
const BASE_PAGE_TITLE = "Amplify Docs";

function getPageTitle(page: Page) {
  if (page.route === "/") {
    return ROOT_TITLE;
  }
  if (page.title) {
    if (page.sectionTitle) {
      return `${page.sectionTitle} - ${page.title} - ${BASE_PAGE_TITLE}`;
    }
    return `${page.title} - ${BASE_PAGE_TITLE}`;
  }
  return BASE_PAGE_TITLE;
}

const createMetaProprtyTag = (type: string, content: string) => {
  let el = document.head.querySelector(`meta[property="${type}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", type);
    el.setAttribute("content", content);
    document.head.appendChild(el);
  } else {
    el.setAttribute("property", type);
    el.setAttribute("content", content);
  }
};

const createMetaNameTag = (type: string, content: string) => {
  let el = document.head.querySelector(`meta[name="${type}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", type);
    el.setAttribute("content", content);
    document.head.appendChild(el);
  } else {
    el.setAttribute("name", type);
    el.setAttribute("content", content);
  }
};

export const updateDocumentHead = (page: Page): void => {
  const title = getPageTitle(page);
  document.title = title;

  createMetaProprtyTag("og:title", title);
  createMetaProprtyTag("og:description", page.description);
  createMetaProprtyTag("og:url", window.location.href);
  createMetaProprtyTag("og:image", "https://docs.amplify.aws/assets/ogp.jpg");

  createMetaNameTag("description", page.description);
  createMetaNameTag("twitter:card", `summary`);
  createMetaNameTag("twitter:title", title);
  createMetaNameTag("twitter:description", page.description);
  createMetaNameTag("twitter:image", "https://docs.amplify.aws/assets/ogp.jpg");
};
