import * as c from "../..";

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
  });

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/content")).body).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    [
      "p",
      null,
      [
        "div",
        null,
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-a-fragment"},
            ["h3", {id: "im-a-fragment"}, "I’m a fragment"],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
    ["h1", {id: "footer"}, "Footer"],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/product")).body).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    [
      "p",
      null,
      [
        "div",
        null,
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-a-fragment"},
            ["h3", {id: "im-a-fragment"}, "I’m a fragment"],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
    ["h1", {id: "footer"}, "Footer"],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/yo/nested")).body).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    [
      "p",
      null,
      [
        "div",
        null,
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-a-fragment"},
            ["h3", {id: "im-a-fragment"}, "I’m a fragment"],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
    ["h1", {id: "footer"}, "Footer"],
    "\n",
  ]);
});
