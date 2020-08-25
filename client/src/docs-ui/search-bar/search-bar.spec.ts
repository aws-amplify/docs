import {DocsSearchBar} from "./search-bar";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-search-bar", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsSearchBar],
            html: `<docs-search-bar />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
