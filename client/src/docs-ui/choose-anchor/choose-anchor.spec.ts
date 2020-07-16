import {DocsChooseAnchor} from "./choose-anchor";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-choose-anchor", () => {
  describe("Component logic", () => {
    let chooseAnchor: DocsChooseAnchor;
    beforeEach(() => (chooseAnchor = new DocsChooseAnchor()));

    it("should init `page` as `undefined`", () =>
      expect(chooseAnchor.page).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsChooseAnchor],
            html: `<docs-choose-anchor />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
