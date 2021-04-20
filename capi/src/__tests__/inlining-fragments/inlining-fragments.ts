import * as c from "../..";
import {hashPath} from "../../utils";

test("inlining-fragments", async () => {
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
    ["h1", {id: "title"}, "Title"],
    "\n",
    [
      "div",
      null,
      [
        "div",
        null,
        [
          "docs-in-page-link",
          {targetId: "im-a-fragment"},
          ["h3", {id: "im-a-fragment"}, "I’m a fragment"],
        ],
        "\n",
      ],
    ],
    "\n",
    ["h1", {id: "footer"}, "Footer"],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/product/product.json"))).body).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    [
      "div",
      null,
      [
        "div",
        null,
        [
          "docs-in-page-link",
          {targetId: "im-a-fragment"},
          ["h3", {id: "im-a-fragment"}, "I’m a fragment"],
        ],
        "\n",
      ],
    ],
    "\n",
    ["h1", {id: "footer"}, "Footer"],
    "\n",
  ]);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/yo/nested.json"))).body,
  ).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    [
      "div",
      null,
      [
        "div",
        null,
        [
          "docs-in-page-link",
          {targetId: "im-a-fragment"},
          ["h3", {id: "im-a-fragment"}, "I’m a fragment"],
        ],
        "\n",
      ],
    ],
    "\n",
    ["h1", {id: "footer"}, "Footer"],
    "\n",
  ]);
});
