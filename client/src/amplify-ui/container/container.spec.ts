import {AmplifyContainer} from "./container";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-container", () => {
  describe("Component logic", () => {
    let amplifyContainer: AmplifyContainer;
    beforeEach(() => (amplifyContainer = new AmplifyContainer()));

    it("should init `innerClass` as `undefined`", () =>
      expect(amplifyContainer.innerClass).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyContainer],
            html: `<amplify-container />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
