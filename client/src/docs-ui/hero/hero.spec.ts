import {DocsHero} from "./hero";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-hero", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsHero],
            html: `
              <docs-hero>
                <h1 slot="heading">Heading</h1>
                <h3 slot="subheading">Subheading</h3>
                <docs-landing-hero-cta slot="cta" />
              </docs-hero>
            `,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
