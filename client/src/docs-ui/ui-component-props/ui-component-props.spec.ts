import {DocsUIComponentProps} from "./ui-component-props";
import {newSpecPage} from "@stencil/core/testing";

describe("ui-component-props", () => {
  describe("Component logic", () => {
    let uiComponentProps: DocsUIComponentProps;
    beforeEach(() => (uiComponentProps = new DocsUIComponentProps()));

    it("should init `tag` as `undefined`", () =>
      expect(uiComponentProps.tag).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsUIComponentProps],
            html: `<ui-component-props />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
