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

  describe("Copy button", () => {
    it("is visible for languages other than console", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCodeBlock],
            html: `<amplify-code-block language="javascript" />`,
          })
        ).root,
      ).toMatchSnapshot();
    });

    it("is not visible if the language is set to console", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCodeBlock],
            html: `<amplify-code-block language="console" />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
