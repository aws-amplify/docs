import * as c from "../..";
import {hashPath} from "../../utils";

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
  expect((await import(hashPath("./api/product/a/aa.json"))).body).toEqual([
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
  expect((await import(hashPath("./api/product/a/aa.json"))).versions).toEqual({
    android: "/product/a/aa/q/platform/android",
    ios: "/product/a/aa/q/platform/ios",
    js: "/product/q/platform/js",
  });

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/product/a/ab.json"))).body).toEqual([
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
  expect((await import(hashPath("./api/product/a/ab.json"))).versions).toEqual({
    android: "/product/a/ab/q/platform/android",
    ios: "/product/a/ab/q/platform/ios",
    js: "/product/a/ab/q/platform/js",
  });
});
