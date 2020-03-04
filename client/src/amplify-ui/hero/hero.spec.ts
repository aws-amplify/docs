import {AmplifyHero} from "./hero";
import {newSpecPage} from "@stencil/core/testing";

describe("amplify-hero", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [AmplifyHero],
            html: `
              <amplify-hero>
                <h1 slot="heading">Heading</h1>
                <h3 slot="subheading">Subheading</h3>
                <docs-landing-hero-cta slot="cta" />
              </amplify-hero>
            `,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
