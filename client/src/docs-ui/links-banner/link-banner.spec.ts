import {DocsLinkBanner} from "./link-banner";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-link-banner", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsLinkBanner],
            html: `<docs-link-banner />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
