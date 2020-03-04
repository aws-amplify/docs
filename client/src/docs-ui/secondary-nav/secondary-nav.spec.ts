import {DocsSecondaryNav} from "./secondary-nav";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-secondary-nav", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsSecondaryNav],
            html: `<docs-secondary-nav />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
