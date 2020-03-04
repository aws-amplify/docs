import {AmplifySidebarLayoutMain} from "./sidebar-layout-main";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-sidebar-layout-main", () => {
  describe("Component logic", () => {
    let amplifySidebarLayoutMain: AmplifySidebarLayoutMain;
    beforeEach(
      () => (amplifySidebarLayoutMain = new AmplifySidebarLayoutMain()),
    );

    it("should init `inView` as `undefined`", () =>
      expect(amplifySidebarLayoutMain.inView).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifySidebarLayoutMain],
            html: `<amplify-sidebar-layout-main />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
