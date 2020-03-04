import {DocsRepoActions} from "./repo-actions";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-repo-actions", () => {
  describe("Component logic", () => {
    let repoActions: DocsRepoActions;
    beforeEach(() => (repoActions = new DocsRepoActions()));

    it("should init `page` as `undefined`", () =>
      expect(repoActions.page).toBeUndefined());
  });

  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsRepoActions],
            html: `<docs-repo-actions />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
