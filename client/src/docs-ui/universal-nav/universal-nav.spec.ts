import {DocsUniversalNav} from "./universal-nav";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-universal-nav", () => {
  describe("Component logic", () => {
    let docsUniversalNav: DocsUniversalNav;
    beforeEach(() => (docsUniversalNav = new DocsUniversalNav()));

    it("should init `blend` as `undefined`", () =>
      expect(docsUniversalNav.blend).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsUniversalNav],
            html: `<docs-universal-nav />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
