import {AmplifySidebarOpenButton} from "./sidebar-open-button";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-sidebar-layout-toggle", () => {
  describe("Component logic", () => {
    let amplifySidebarOpenButton: AmplifySidebarOpenButton;
    beforeEach(
      () => (amplifySidebarOpenButton = new AmplifySidebarOpenButton()),
    );

    it("should init `toggleInView` as `undefined`", () =>
      expect(amplifySidebarOpenButton.toggleInView).toBeUndefined());

    it("should init `inView` as `undefined`", () =>
      expect(amplifySidebarOpenButton.inView).toBeUndefined());

    it("should init `isHovered` as `false`", () =>
      expect(amplifySidebarOpenButton.isHovered).toBe(false));
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifySidebarOpenButton],
            html: `<amplify-sidebar-open-button />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
