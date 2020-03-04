import {AmplifySidebarLayoutSidebar} from "./sidebar-layout-sidebar";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-sidebar-layout-sidebar", () => {
  describe("Component logic", () => {
    let amplifySidebarLayoutSidebar: AmplifySidebarLayoutSidebar;
    beforeEach(
      () => (amplifySidebarLayoutSidebar = new AmplifySidebarLayoutSidebar()),
    );

    it("should init `toggleInView` as `undefined`", () =>
      expect(amplifySidebarLayoutSidebar.toggleInView).toBeUndefined());

    it("should init `inView` as `undefined`", () =>
      expect(amplifySidebarLayoutSidebar.inView).toBeUndefined());

    it("should init `top` as `undefined`", () =>
      expect(amplifySidebarLayoutSidebar.top).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifySidebarLayoutSidebar],
            html: `<amplify-sidebar-layout-sidebar />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
