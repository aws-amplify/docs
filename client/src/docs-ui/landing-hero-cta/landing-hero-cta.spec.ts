import {DocsLandingHeroCTA} from "./landing-hero-cta";
import {newSpecPage} from "@stencil/core/testing";

describe("docs-landing-hero-cta", () => {
  describe("Render logic", () => {
    it("should render", async () => {
      expect(
        (
          await newSpecPage({
            components: [DocsLandingHeroCTA],
            html: `<docs-landing-page-hero-cta />`,
          })
        ).root,
      ).toMatchSnapshot();
    });
  });
});
