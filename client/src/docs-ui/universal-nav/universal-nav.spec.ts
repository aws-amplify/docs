import {DocsUniversalNav} from "./universal-nav";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-universal-nav", () => {
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
