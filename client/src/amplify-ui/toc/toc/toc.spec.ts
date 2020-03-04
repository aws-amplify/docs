import {AmplifyTOC} from "./toc";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-toc", () => {
  describe("Component logic", () => {
    let toc: AmplifyTOC;
    beforeEach(() => (toc = new AmplifyTOC()));

    it("should init `elements` as `undefined`", () =>
      expect(toc.elements).toBeUndefined());

    it("should init `activeLinkI` as `undefined`", () =>
      expect(toc.activeLinkI).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyTOC],
            html: `<amplify-toc />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
