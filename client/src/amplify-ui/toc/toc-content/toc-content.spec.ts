import {AmplifyTOCContent} from "./toc-content";

describe("amplify-toc-content", () => {
  describe("Component logic", () => {
    let tocContent: AmplifyTOCContent;
    beforeEach(() => (tocContent = new AmplifyTOCContent()));

    it("should init `setContent` as `undefined`", () =>
      expect(tocContent.setContent).toBeUndefined());

    it("should init `content` as truthy", () =>
      expect(tocContent.content).toBeTruthy());
  });
});
