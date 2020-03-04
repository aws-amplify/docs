import {DocsChooseIntegrationAnchor} from "./choose-integration-anchor";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-choose-integration-anchor", () => {
  describe("Component logic", () => {
    let chooseAnchor: DocsChooseIntegrationAnchor;
    beforeEach(() => (chooseAnchor = new DocsChooseIntegrationAnchor()));

    it("should init `page` as `undefined`", () =>
      expect(chooseAnchor.page).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsChooseIntegrationAnchor],
            html: `<docs-choose-integration-anchor />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
