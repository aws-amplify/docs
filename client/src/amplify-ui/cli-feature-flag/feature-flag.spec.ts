import {AmplifyFeatureFlag} from "./feature-flag";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-feature-flag", () => {
  describe("Component logic", () => {
    let featureFlag: AmplifyFeatureFlag;
    beforeEach(() => (featureFlag = new AmplifyFeatureFlag()));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyFeatureFlag],
            html: `<amplify-feature-flag />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
