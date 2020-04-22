import {DocsCard} from "./card";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-card", () => {
  describe("Component logic", () => {
    let docsCard: DocsCard;
    beforeEach(() => (docsCard = new DocsCard()));

    it("should init `vertical` as `undefined`", () =>
      expect(docsCard.vertical).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsCard],
            html: `<docs-card />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
