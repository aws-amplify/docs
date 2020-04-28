import {AmplifyCodeBlockSwitcher} from "./code-block-switcher";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-code-block-switcher", () => {
  describe("Component logic", () => {
    let codeBlock: AmplifyCodeBlockSwitcher;
    beforeEach(() => (codeBlock = new AmplifyCodeBlockSwitcher()));

    it("should init `tabHeadingList` as `undefined`", () =>
      expect(codeBlock.tabHeadingList).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCodeBlockSwitcher],
            html: `<amplify-code-block-switcher />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
