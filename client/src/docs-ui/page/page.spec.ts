import {DocsPage} from "./page";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-page", () => {
  describe("Component logic", () => {
    let docsPage: DocsPage;
    beforeEach(() => (docsPage = new DocsPage()));

    it("should init `selected` as `{}`", () =>
      expect(docsPage.selectedFilters).toEqual({}));

    it("should init `data` as `undefined`", () =>
      expect(docsPage.pageData).toBeUndefined());

    it("should init `blendUniversalNav` as `undefined`", () =>
      expect(docsPage.blendUniversalNav).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsPage],
            html: `<docs-page />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
