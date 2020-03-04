import {AmplifyCard} from "./card";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-card", () => {
  describe("Component logic", () => {
    let amplifyCard: AmplifyCard;
    beforeEach(() => (amplifyCard = new AmplifyCard()));

    it("should init `vertical` as `undefined`", () =>
      expect(amplifyCard.vertical).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCard],
            html: `<amplify-card />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
