import {DocsFourOFour} from "./four-o-four";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-four-o-four", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsFourOFour],
            html: `<docs-four-o-four />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
