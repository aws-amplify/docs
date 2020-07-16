import {DocsMenu} from "./menu";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-menu", () => {
  describe("Component logic", () => {
    let menu: DocsMenu;
    beforeEach(() => (menu = new DocsMenu()));

    it("should init `page` as `undefined`", () =>
      expect(menu.page).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsMenu],
            html: `<docs-menu />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
