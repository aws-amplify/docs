import {DocsCard} from "./card";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-card", () => {
  describe("Component logic", () => {
    let card: DocsCard;
    beforeEach(() => (card = new DocsCard()));

    it("should init `vertical` as `undefined`", () =>
      expect(card.vertical).toBeUndefined());
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
