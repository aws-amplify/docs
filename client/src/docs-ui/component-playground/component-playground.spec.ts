import {DocsComponentPlayground} from "./component-playground";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-component-playground", () => {
  describe("Component logic", () => {
    let componentPlayground: DocsComponentPlayground;
    beforeEach(() => (componentPlayground = new DocsComponentPlayground()));
  });

  describe("Render logic", () => {
    it("should render empty", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsComponentPlayground],
            html: `<docs-component-playground />`,
          })
        ).root,
      ).toMatchSnapshot();
    });

    it("should render with AuthenticatorWithSlots custom component", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsComponentPlayground],
            html: `<docs-component-playground component-name="AuthenticatorWithSlot"></docs-component-playground>`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
