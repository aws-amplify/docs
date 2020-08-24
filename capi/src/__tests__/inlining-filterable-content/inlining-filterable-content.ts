import * as c from "../..";

test("inlining-filterable-content", async () => {
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
  expect((await import("./api/q/platform/android/content")).body).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    null,
    "\n\n",
    null,
    "\n\n",
    ["div", null, "\n\n", ["p", null, "Android-only content"], "\n"],
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/q/platform/ios/content")).body).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    null,
    "\n\n",
    ["div", null, "\n\n", ["p", null, "iOS-only content"], "\n"],
    "\n\n",
    null,
    "\n",
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/q/platform/js/content")).body).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    ["div", null, "\n\n", ["p", null, "JS-only content"], "\n"],
    "\n\n",
    null,
    "\n\n",
    null,
    "\n",
  ]);
});
