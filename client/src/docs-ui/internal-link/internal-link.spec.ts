import {DocsInternalLink} from "./internal-link";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-internal-link", () => {
  describe("Component logic", () => {
    let internalLink: DocsInternalLink;
    beforeEach(() => (internalLink = new DocsInternalLink()));

    it("should init `href` as `undefined`", () =>
      expect(internalLink.href).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsInternalLink],
            html: `<docs-internal-link />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
