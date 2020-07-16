import {DocsChatButton} from "./chat-button";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-chat-button", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsChatButton],
            html: `<docs-chat-button />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
