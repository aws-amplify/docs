import {Page} from "../api";

const ROOT_TITLE = "Amplify Framework Docs";
const BASE_PAGE_TITLE = "Amplify Docs";

function getPageTitle(page: Page) {
  if (page.title) {
    if (page.sectionTitle) {
      return `${page.sectionTitle} - ${page.title} - ${BASE_PAGE_TITLE}`;
    }
    return `${page.title} - ${BASE_PAGE_TITLE}`;
  }
  return BASE_PAGE_TITLE;
}

const createOgTag = (type: string, content: string) => {
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

const createTwitterTag = (type: string, content: string) => {
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
  let title = "";
  if (page.route === "/") {
    title = ROOT_TITLE;
  } else {
    title = getPageTitle(page);
  }
  document.title = title;

  createOgTag("og:title", title);
  createOgTag("og:description", page.description);
  createOgTag("og:url", window.location.href);
  createOgTag("og:image", "https://docs.amplify.aws/assets/ogp.jpg");

  createTwitterTag("twitter:card", `summary`);
  createTwitterTag("twitter:title", title);
  createTwitterTag("twitter:description", page.description);
  createTwitterTag("twitter:image", "https://docs.amplify.aws/assets/ogp.jpg");
};
