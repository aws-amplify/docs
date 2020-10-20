import {AmplifyBlockSwitcher} from "./block-switcher";
import {AmplifyCodeBlock} from "./block";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-block-switcher", () => {
  describe("Component logic", () => {
    it("should recursively gather all block names as headings", async () => {
      const page = await newSpecPage({
        components: [AmplifyBlockSwitcher, AmplifyCodeBlock],
        html: `
          <amplify-block-switcher>
            <div id="red herring">
              <amplify-blurk name="nope"></amplify-blurk>
            </div>
            <div>
              <amplify-block name="test 1"></amplify-block>
              <amplify-block name="test 2"></amplify-block>
            </div>
          </amplify-block-switcher>`,
      });
      const blockSwitcher = page.rootInstance;
      expect(blockSwitcher.tabHeadings).toEqual(["test 1", "test 2"]);
    });
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
