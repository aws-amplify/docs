import {DocsFilterTarget} from "./filter-target";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-filter-target", () => {
  describe("Component logic", () => {
    let filterTarget: DocsFilterTarget;
    beforeEach(() => (filterTarget = new DocsFilterTarget()));

    it("should init `selectedFilters` as `undefined`", () =>
      expect(filterTarget.selectedFilters).toBe(undefined));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsFilterTarget],
            html: `<docs-filter-target />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
