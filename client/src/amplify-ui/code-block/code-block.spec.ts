import {AmplifyCodeBlock} from "./code-block";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-code-block", () => {
  describe("Component logic", () => {
    let codeBlock: AmplifyCodeBlock;
    beforeEach(() => (codeBlock = new AmplifyCodeBlock()));

    it("should init `parsedLineCount` as `undefined`", () =>
      expect(codeBlock.parsedLineCount).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCodeBlock],
            html: `<amplify-code-block />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
