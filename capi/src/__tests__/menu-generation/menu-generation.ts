import * as c from "../..";
import {hashPath} from "../../utils";

test("menu-generation", async () => {
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

  const menu = [
    {
      title: "Auth",
      items: [
        {title: "Overview", route: "/lib/auth/overview"},
        {title: "Intro", route: "/lib/auth/intro"},
        {title: "Setup", route: "/lib/auth/setup"},
        {title: "Goodbye", route: "/lib/auth/goodbye"},
      ],
    },
    {
      title: "API",
      items: [
        {title: "Overview", route: "/lib/api/overview"},
        {title: "Intro", route: "/lib/api/intro"},
        {title: "Setup", route: "/lib/api/setup"},
        {title: "Goodbye", route: "/lib/api/goodbye"},
      ],
    },
    {
      title: "PubSub",
      items: [
        {title: "Overview", route: "/lib/pubsub/overview"},
        {title: "Intro", route: "/lib/pubsub/intro"},
        {title: "Setup", route: "/lib/pubsub/setup"},
        {title: "Goodbye", route: "/lib/pubsub/goodbye"},
      ],
    },
  ];

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/api/overview.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
  // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/android/overview.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/ios/overview.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/js/overview.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/api/intro.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/android/intro.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/ios/intro.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/js/intro.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/api/setup.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/android/setup.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/ios/setup.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/js/setup.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/api/goodbye.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/android/goodbye.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/ios/goodbye.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/api/q/platform/js/goodbye.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/auth/overview.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/android/overview.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/ios/overview.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/js/overview.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/auth/intro.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/android/intro.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/ios/intro.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/js/intro.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/auth/setup.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/android/setup.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/ios/setup.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/js/setup.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/auth/goodbye.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/android/goodbye.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/ios/goodbye.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/auth/q/platform/js/goodbye.json"))).menu,
  ).toEqual(menu);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/overview.json"))).menu,
  ).toEqual(undefined);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    // eslint-disable-next-line
    (await import(
        hashPath("./api/lib/pubsub/q/platform/android/overview.json")
      )
    ).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/ios/overview.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/js/overview.json")))
      .menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/pubsub/intro.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/android/intro.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/ios/intro.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/js/intro.json"))).menu,
  ).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import(hashPath("./api/lib/pubsub/setup.json"))).menu).toEqual(
    undefined,
  );
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/android/setup.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/ios/setup.json"))).menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/js/setup.json"))).menu,
  ).toEqual(menu);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/goodbye.json"))).menu,
  ).toEqual(undefined);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/android/goodbye.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/ios/goodbye.json")))
      .menu,
  ).toEqual(menu);
  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/lib/pubsub/q/platform/js/goodbye.json")))
      .menu,
  ).toEqual(menu);
});
