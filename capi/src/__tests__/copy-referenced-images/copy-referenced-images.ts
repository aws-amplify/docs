import * as c from "../..";
import * as fs from "fs-extra";
import * as path from "path";

test("route generation", async () => {
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

  const a = path.join(__dirname, "www/product/another-image.jpg");
  const b = path.join(__dirname, "www/root-image.svg");

  const status = await (async (): Promise<"resolved" | "not resolved"> => {
    try {
      await Promise.all([a, b].map((p) => fs.access(p)));
      return "resolved";
    } catch (e) {
      return "not resolved";
    }
  })();

  expect(status).toBe("resolved");
});
