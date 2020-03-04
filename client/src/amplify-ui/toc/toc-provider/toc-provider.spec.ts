import {AmplifyTOCProvider} from "./toc-provider";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-toc-provider", () => {
  describe("Component logic", () => {
    let tocProvider: AmplifyTOCProvider;
    beforeEach(() => (tocProvider = new AmplifyTOCProvider()));

    it("should init `content` as `undefined`", () =>
      expect(tocProvider.content).toBeUndefined());

    it("should init `elements` as `undefined`", () =>
      expect(tocProvider.elements).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyTOCProvider],
            html: `<amplify-toc-provider />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
