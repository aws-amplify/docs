import {DocsSelectAnchor} from "./select-anchor";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-select-anchor", () => {
  describe("Component logic", () => {
    let selectAnchor: DocsSelectAnchor;
    beforeEach(() => (selectAnchor = new DocsSelectAnchor()));

    it("should init `page` as `undefined`", () =>
      expect(selectAnchor.page).toBeUndefined());

    it("should init `showOptions` as `false`", () =>
      expect(selectAnchor.showOptions).toBe(false));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsSelectAnchor],
            html: `<docs-select-anchor />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
