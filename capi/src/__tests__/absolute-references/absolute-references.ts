import * as c from "../..";
import {hashPath} from "../../utils";

test("absolute md references", async () => {
  await c.API({
    cwd: __dirname,
    contentDir: "content",
    filters: {
      platform: ["android", "ios", "js"],
      framework: ["angular", "ionic", "react", "react-native", "vue"],
    },
    outDir: "api",
    publicDir: "www",
    srcDir: "",
  });

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/content.json"))).body).toEqual([
    ["p", null, "Root Page"],
    "\n",
    ["p", null, ["docs-internal-link", {href: "/product"}, "yo"]],
    "\n",
    ["p", null, ["docs-internal-link", {href: "/product/subpages/a"}, "yoo"]],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/product/product.json"))).body).toEqual([
    ["h1", {id: "hi"}, "Hi"],
    "\n",
    [
      "div",
      null,
      [
        "div",
        null,
        ["p", null, "fragment start"],
        "\n",
        ["h1", {id: "im-a-fragment"}, "I’m a fragment"],
        "\n",
        [
          "p",
          null,
          ["docs-internal-link", {href: "/product"}, "link to subpage"],
        ],
        "\n",
        [
          "p",
          null,
          [
            "img",
            {
              src: "/product/some-image.png",
              alt: "Some Image",
              title: "Some Image",
            },
          ],
        ],
        "\n",
        ["p", null, "fragment end"],
        "\n",
      ],
    ],
    "\n",
    [
      "p",
      null,
      [
        "img",
        {
          src: "/product/some-image.png",
          alt: "Some Image",
          title: "Some Image",
        },
      ],
    ],
    "\n",
    [
      "p",
      null,
      ["docs-internal-link", {href: "/product/subpages/a"}, "subpage"],
    ],
    "\n",
  ]);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/subpages/a.json"))).body,
  ).toEqual([
    ["h1", {id: "hi"}, "Hi"],
    "\n",
    [
      "div",
      null,
      [
        "div",
        null,
        ["p", null, "fragment start"],
        "\n",
        ["h1", {id: "im-a-fragment"}, "I’m a fragment"],
        "\n",
        [
          "p",
          null,
          ["docs-internal-link", {href: "/product"}, "link to subpage"],
        ],
        "\n",
        [
          "p",
          null,
          [
            "img",
            {
              src: "/product/some-image.png",
              alt: "Some Image",
              title: "Some Image",
            },
          ],
        ],
        "\n",
        ["p", null, "fragment end"],
        "\n",
      ],
    ],
    "\n",
    [
      "p",
      null,
      ["docs-internal-link", {href: "/product"}, "link to root page"],
    ],
    "\n",
    [
      "p",
      null,
      [
        "img",
        {
          src: "/product/some-image.png",
          alt: "Some Image",
          title: "Some Image",
        },
      ],
    ],
    "\n",
  ]);
});
