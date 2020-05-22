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
    srcDir: "",
  });

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/aa")).body).toEqual([
    [
      "docs-choose-anchor",
      {
        page: {
          filterKey: "platform",
          route: "/product/a/aa",
          versions: {
            android: "/product/a/aa/q/platform/android",
            ios: "/product/a/aa/q/platform/ios",
            js: "/product/q/platform/js",
          },
        },
      },
    ],
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
      "docs-choose-anchor",
      {
        page: {
          filterKey: "platform",
          route: "/product/a/ab",
          versions: {
            android: "/product/a/ab/q/platform/android",
            ios: "/product/a/ab/q/platform/ios",
            js: "/product/a/ab/q/platform/js",
          },
        },
      },
    ],
  ]);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/product/a/ab")).versions).toEqual({
    android: "/product/a/ab/q/platform/android",
    ios: "/product/a/ab/q/platform/ios",
    js: "/product/a/ab/q/platform/js",
  });
});
