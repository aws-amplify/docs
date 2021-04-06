import * as c from "../..";
import {hashPath} from "../../utils";

test("filter metadata generation", async () => {
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

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/product.json"))).versions,
  ).toEqual({
    android: "/product/q/platform/android",
    ios: "/product/q/platform/ios",
    js: "/product/q/platform/js",
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/all-three.json"))).versions,
  ).toEqual({
    android: "/product/a/all-three/q/platform/android",
    ios: "/product/a/all-three/q/platform/ios",
    js: "/product/a/all-three/q/platform/js",
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/just-one.json"))).versions,
  ).toEqual({
    android: "/product/q/platform/android",
    ios: "/product/q/platform/ios",
    js: "/product/a/just-one/q/platform/js",
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/one-but-agnostic.json"))).versions,
  ).toEqual({
    android: "/product/a/one-but-agnostic/q/platform/android",
    ios: "/product/a/one-but-agnostic/q/platform/ios",
    js: "/product/a/one-but-agnostic/q/platform/js",
  });
});
