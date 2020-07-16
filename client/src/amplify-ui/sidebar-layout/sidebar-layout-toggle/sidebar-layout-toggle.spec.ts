import {AmplifySidebarLayoutToggle} from "./sidebar-layout-toggle";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-sidebar-layout-toggle", () => {
  describe("Component logic", () => {
    let amplifySidebarLayoutToggle: AmplifySidebarLayoutToggle;
    beforeEach(
      () => (amplifySidebarLayoutToggle = new AmplifySidebarLayoutToggle()),
    );

    it("should init `toggleInView` as `undefined`", () =>
      expect(amplifySidebarLayoutToggle.toggleInView).toBeUndefined());

    it("should init `inView` as `undefined`", () =>
      expect(amplifySidebarLayoutToggle.inView).toBeUndefined());

    it("should init `inViewClass` as `undefined`", () =>
      expect(amplifySidebarLayoutToggle.inViewClass).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifySidebarLayoutToggle],
            html: `<amplify-sidebar-layout-toggle />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
