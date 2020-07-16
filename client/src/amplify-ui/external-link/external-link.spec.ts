import {AmplifyExternalLink} from "./external-link";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-external-link", () => {
  describe("Component logic", () => {
    let amplifyExternalLink: AmplifyExternalLink;
    beforeEach(() => (amplifyExternalLink = new AmplifyExternalLink()));

    it("should init `href` as `undefined`", () =>
      expect(amplifyExternalLink.href).toBeUndefined());

    it("should init `anchorTitle` as `undefined`", () =>
      expect(amplifyExternalLink.anchorTitle).toBeUndefined());

    it("should init `redirect` as `undefined`", () =>
      expect(amplifyExternalLink.redirect).toBeUndefined());

    it("should init `graphic` as `undefined`", () =>
      expect(amplifyExternalLink.graphic).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyExternalLink],
            html: `<amplify-external-link />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
