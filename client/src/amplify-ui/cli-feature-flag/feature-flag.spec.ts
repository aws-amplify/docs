import {AmplifyFeatureFlags} from "./feature-flags";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-feature-flags", () => {
  describe("Component logic", () => {
    let featureFlags: AmplifyFeatureFlags;
    beforeEach(() => (featureFlags = new AmplifyFeatureFlags()));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyFeatureFlags],
            html: `<amplify-feature-flags />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
