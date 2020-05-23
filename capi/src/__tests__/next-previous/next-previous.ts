import * as c from "../..";

test("next previous metadata generation", async () => {
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
  expect((await import("./api/product/a/first")).next).toEqual(undefined);

  expect(
    // eslint-disable-next-line
  // @ts-ignore
    (await import("./api/product/a/q/platform/android/first")).next,
  ).toEqual({
    android: {
      title: "Third",
      route: "/product/a/third",
      filters: {platform: ["android"]},
    },
    ios: {
      title: "Fourth",
      route: "/product/a/fourth",
      filters: {platform: ["ios"]},
    },
    js: {
      title: "Second",
      route: "/product/a/second",
      filters: {platform: ["js"]},
    },
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/second")).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/q/platform/js/second")).previous,
  ).toEqual({
    android: {title: "First", route: "/product/a/first"},
    ios: {title: "First", route: "/product/a/first"},
    js: {title: "First", route: "/product/a/first"},
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/second")).next,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/q/platform/js/second")).next,
  ).toEqual({
    android: {
      title: "Third",
      route: "/product/a/third",
      filters: {platform: ["android"]},
    },
    ios: {
      title: "Fourth",
      route: "/product/a/fourth",
      filters: {platform: ["ios"]},
    },
    js: {title: "Overview", route: "/product/a/overview"},
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/third")).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/q/platform/android/third")).previous,
  ).toEqual({
    android: {title: "First", route: "/product/a/first"},
    ios: {title: "First", route: "/product/a/first"},
    js: {
      title: "Second",
      route: "/product/a/second",
      filters: {platform: ["js"]},
    },
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/third")).next,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/q/platform/android/third")).next,
  ).toEqual({
    android: {title: "Overview", route: "/product/a/overview"},
    ios: {
      title: "Fourth",
      route: "/product/a/fourth",
      filters: {platform: ["ios"]},
    },
    js: {title: "Overview", route: "/product/a/overview"},
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/fourth")).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/q/platform/ios/fourth")).previous,
  ).toEqual({
    android: {
      title: "Third",
      route: "/product/a/third",
      filters: {platform: ["android"]},
    },
    ios: {title: "First", route: "/product/a/first"},
    js: {
      title: "Second",
      route: "/product/a/second",
      filters: {platform: ["js"]},
    },
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/fourth")).next,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/q/platform/ios/fourth")).next,
  ).toEqual({
    android: {title: "Overview", route: "/product/a/overview"},
    ios: {title: "Overview", route: "/product/a/overview"},
    js: {title: "Overview", route: "/product/a/overview"},
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/overview")).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import("./api/product/a/q/platform/android/overview")).previous,
  ).toEqual({
    android: {
      title: "Third",
      route: "/product/a/third",
      filters: {platform: ["android"]},
    },
    ios: {
      title: "Fourth",
      route: "/product/a/fourth",
      filters: {platform: ["ios"]},
    },
    js: {
      title: "Second",
      route: "/product/a/second",
      filters: {platform: ["js"]},
    },
  });
});
