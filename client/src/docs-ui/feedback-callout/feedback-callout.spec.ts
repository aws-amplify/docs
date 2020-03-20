import {DocsFeedbackCallout} from "./feedback-callout";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-feedback-callout", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsFeedbackCallout],
            html: `<docs-feedback-callout />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
