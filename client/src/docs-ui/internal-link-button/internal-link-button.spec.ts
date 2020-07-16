import {DocsInternalLinkButton} from "./internal-link-button";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-internal-link-button", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsInternalLinkButton],
            html: `<docs-internal-link-button />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
