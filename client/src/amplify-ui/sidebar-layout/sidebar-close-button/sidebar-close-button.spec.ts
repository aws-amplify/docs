import {AmplifySidebarCloseButton} from "./sidebar-close-button";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-sidebar-layout-toggle", () => {
  describe("Component logic", () => {
    let amplifySidebarCloseButton: AmplifySidebarCloseButton;
    beforeEach(
      () => (amplifySidebarCloseButton = new AmplifySidebarCloseButton()),
    );

    it("should init `toggleInView` as `undefined`", () =>
      expect(amplifySidebarCloseButton.toggleInView).toBeUndefined());

    it("should init `inView` as `undefined`", () =>
      expect(amplifySidebarCloseButton.inView).toBeUndefined());

    it("should init `isHovered` as `false`", () =>
      expect(amplifySidebarCloseButton.isHovered).toBe(false));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifySidebarCloseButton],
            html: `<amplify-sidebar-close-button />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
