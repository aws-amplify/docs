import {AmplifyResponsiveGrid} from "./responsive-grid";

describe("amplify-responsive-grid", () => {
  describe("Component logic", () => {
    let amplifyResponsiveGrid: AmplifyResponsiveGrid;
    beforeEach(() => (amplifyResponsiveGrid = new AmplifyResponsiveGrid()));

    it("should init `gridGap` as `2`", () =>
      expect(amplifyResponsiveGrid.gridGap).toBe(2));
  });
});
