import {DocsNextPrevious} from "./next-previous";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-next-previous", () => {
  describe("Component logic", () => {
    let nextPrevious: DocsNextPrevious;
    beforeEach(() => (nextPrevious = new DocsNextPrevious()));

    it("should init `page` as `undefined`", () =>
      expect(nextPrevious.page).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsNextPrevious],
            html: `<docs-next-previous />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
