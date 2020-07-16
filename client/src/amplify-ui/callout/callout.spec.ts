import {AmplifyCallout} from "./callout";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-callout", () => {
  describe("Component logic", () => {
    let callout: AmplifyCallout;
    beforeEach(() => (callout = new AmplifyCallout()));

    it("should init `warning` as `undefined`", () =>
      expect(callout.warning).toBeUndefined());

    it("should init `type` as `undefined`", () =>
      expect(callout.type).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyCallout],
            html: `<amplify-callout />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
