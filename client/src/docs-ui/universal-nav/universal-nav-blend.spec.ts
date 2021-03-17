import {DocsUniversalNavBlend} from "./universal-nav-blend";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-universal-nav", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsUniversalNavBlend],
            html: `<docs-universal-nav-blend />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
