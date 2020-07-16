import {AmplifySidebarLayout} from "./sidebar-layout";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-sidebar-layout", () => {
  describe("Component logic", () => {
    let amplifySidebarLayout: AmplifySidebarLayout;
    beforeEach(() => (amplifySidebarLayout = new AmplifySidebarLayout()));

    it("should init `sidebarInView` as `false`", () =>
      expect(amplifySidebarLayout.sidebarInView).toBe(false));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifySidebarLayout],
            html: `<amplify-sidebar-layout />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
