import {DocsInPageLink} from "./in-page-link";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-in-page-link", () => {
  describe("Component logic", () => {
    let inPageLink: DocsInPageLink;
    beforeEach(() => (inPageLink = new DocsInPageLink()));

    it("should init `targetId` as `undefined`", () =>
      expect(inPageLink.targetId).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsInPageLink],
            html: `<docs-in-page-link />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
