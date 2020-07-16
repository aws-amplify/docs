import {DocsFooter} from "./footer";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-footer", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsFooter],
            html: `<docs-footer />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
