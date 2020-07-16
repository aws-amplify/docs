import {AmplifyCodeBlock} from "./code-block";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-code-block", () => {
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
            html: `<amplify-code-block language="javascript">
                     const lol = 'i dunno';
                     alert(lol);
                   </amplify-code-block>`,
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

  describe("Line numbers", () => {
    it("is visible if the code block has more than one line", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCodeBlock],
            html: `<amplify-code-block language="javascript">
                     const lol = 'i dunno';
                     alert(lol);
                   </amplify-code-block>`,
          })
        ).root,
      ).toMatchSnapshot();
    });

    it("is not visible if the code block only has a single line", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCodeBlock],
            html: `<amplify-code-block language="console">
                   line 1
                   line 2
                   line 3
                   </amplify-code-block>`,
          })
        ).root,
      ).toMatchSnapshot();
    });

    it("is not visible if the language is set to console", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCodeBlock],
            html: `<amplify-code-block language="console">
                   line 1
                   line 2
                   line 3
                   </amplify-code-block>`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
