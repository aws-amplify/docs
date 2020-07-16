import {AmplifyResponsiveGrid} from "./responsive-grid";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-responsive-grid", () => {
  describe("Component logic", () => {
    let amplifyResponsiveGrid: AmplifyResponsiveGrid;
    beforeEach(() => (amplifyResponsiveGrid = new AmplifyResponsiveGrid()));

    it("should init `gridGap` as `2`", () =>
      expect(amplifyResponsiveGrid.gridGap).toBe(2));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyResponsiveGrid],
            html: `<amplify-grid />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
