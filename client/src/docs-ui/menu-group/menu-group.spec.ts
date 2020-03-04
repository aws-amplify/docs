import {DocsMenuGroup} from "./menu-group";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-menu-group", () => {
  describe("Component logic", () => {
    let menu: DocsMenuGroup;
    beforeEach(() => (menu = new DocsMenuGroup()));

    it("should init `menuGroup` as `undefined`", () =>
      expect(menu.menuGroup).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsMenuGroup],
            html: `<docs-menu-group />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
