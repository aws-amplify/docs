import * as c from "../..";

test("inlining-filterable-fragments", async () => {
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
  expect((await import("./api/product/a/aa")).body).toEqual([
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "ios"}},
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-an-ios-specific-fragment"},
            [
              "h2",
              {id: "im-an-ios-specific-fragment"},
              "I’m an iOS-specific fragment",
            ],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "android"}},
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-an-android-specific-fragment"},
            [
              "h2",
              {id: "im-an-android-specific-fragment"},
              "I’m an Android-specific fragment",
            ],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/aa")).versions).toEqual({
    android: "/product/a/aa/q/platform/android",
    ios: "/product/a/aa/q/platform/ios",
    js: "/product/q/platform/js",
  });

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/ab")).body).toEqual([
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "ios"}},
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-an-ios-specific-fragment"},
            [
              "h2",
              {id: "im-an-ios-specific-fragment"},
              "I’m an iOS-specific fragment",
            ],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "android"}},
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-an-android-specific-fragment"},
            [
              "h2",
              {id: "im-an-android-specific-fragment"},
              "I’m an Android-specific fragment",
            ],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
    [
      "p",
      null,
      [
        "docs-filter-target",
        {filters: {platform: "js"}},
        [
          "div",
          {slot: "content"},
          [
            "docs-in-page-link",
            {targetId: "im-a-js-specific-fragment"},
            [
              "h2",
              {id: "im-a-js-specific-fragment"},
              "I’m a JS-specific fragment",
            ],
          ],
          "\n",
        ],
      ],
    ],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/ab")).versions).toEqual({
    android: "/product/a/ab/q/platform/android",
    ios: "/product/a/ab/q/platform/ios",
    js: "/product/a/ab/q/platform/js",
  });
});
