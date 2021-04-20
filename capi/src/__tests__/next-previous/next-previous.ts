import * as c from "../..";
import {hashPath} from "../../utils";

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
  expect((await import(hashPath("./api/product/a/first.json"))).next).toEqual(
    undefined,
  );

  expect(
    // eslint-disable-next-line
  // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/android/first.json")))
      .next,
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
    (await import(hashPath("./api/product/a/second.json"))).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/js/second.json")))
      .previous,
  ).toEqual({
    android: {title: "First", route: "/product/a/first"},
    ios: {title: "First", route: "/product/a/first"},
    js: {title: "First", route: "/product/a/first"},
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/second.json"))).next,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/js/second.json"))).next,
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
    (await import(hashPath("./api/product/a/third.json"))).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/android/third.json")))
      .previous,
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
    (await import(hashPath("./api/product/a/third.json"))).next,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/android/third.json")))
      .next,
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
    (await import(hashPath("./api/product/a/fourth.json"))).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/ios/fourth.json")))
      .previous,
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
    (await import(hashPath("./api/product/a/fourth.json"))).next,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/ios/fourth.json"))).next,
  ).toEqual({
    android: {title: "Overview", route: "/product/a/overview"},
    ios: {title: "Overview", route: "/product/a/overview"},
    js: {title: "Overview", route: "/product/a/overview"},
  });

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/overview.json"))).previous,
  ).toEqual(undefined);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/product/a/q/platform/android/overview.json")))
      .previous,
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
