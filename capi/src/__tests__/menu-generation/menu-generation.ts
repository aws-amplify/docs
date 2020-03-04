import * as c from "../..";

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
  expect((await import("./api/lib/api/overview")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/api/intro")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/api/setup")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/api/goodbye")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/auth/overview")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/auth/intro")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/auth/setup")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/auth/goodbye")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/pubsub/overview")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/pubsub/intro")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/pubsub/setup")).menu).toEqual(menu);

  // eslint-disable-next-line
  // @ts-ignore
  expect((await import("./api/lib/pubsub/goodbye")).menu).toEqual(menu);
});
