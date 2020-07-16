import {AmplifyTOCContent} from "./toc-content";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-toc-content", () => {
  describe("Component logic", () => {
    let tocContent: AmplifyTOCContent;
    beforeEach(() => (tocContent = new AmplifyTOCContent()));

    it("should init `setContent` as `undefined`", () =>
      expect(tocContent.setContent).toBeUndefined());

    it("should init `content` as truthy", () =>
      expect(tocContent.content).toBeTruthy());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyTOCContent],
            html: `<amplify-toc-content />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
