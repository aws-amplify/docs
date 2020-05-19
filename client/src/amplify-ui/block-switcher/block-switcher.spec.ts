import {AmplifyBlockSwitcher} from "./block-switcher";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-block-switcher", () => {
  describe("Component logic", () => {
    let blockSwitcher: AmplifyBlockSwitcher;
    beforeEach(() => (blockSwitcher = new AmplifyBlockSwitcher()));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyBlockSwitcher],
            html: `<amplify-block-switcher />`,
          })
        ).root,
      ).toMatchSnapshot();
    });

    it("should render with contained blocks", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyBlockSwitcher],
            html: `<amplify-block-switcher><amplify-block></amplify-block></amplify-block-switcher>`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
