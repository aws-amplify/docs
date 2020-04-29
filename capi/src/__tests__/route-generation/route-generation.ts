import * as c from "../..";

test("copy referenced images", async () => {
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
  const routes = (await import("./api/routes")).routes;
  [
    "/",
    "/product",
    "/product/b/ba",
    "/product/a/ab",
    "/product/a/aa",
    "/product/b/bb",
    "/product/c/ca",
    "/product/c/cb",
  ].forEach((route) => {
    expect(routes.includes(route)).toBeTruthy();
  });
});
