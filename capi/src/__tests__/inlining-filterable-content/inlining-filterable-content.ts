import * as c from "../..";
import {hashPath} from "../../utils";

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

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/q/platform/android/content.json"))).body,
  ).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    null,
    "\n\n",
    null,
    "\n\n",
    ["div", null, "\n\n", ["p", null, "Android-only content"], "\n"],
    "\n",
  ]);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/q/platform/ios/content.json"))).body,
  ).toEqual([
    ["h1", {id: "title"}, "Title"],
    "\n",
    null,
    "\n\n",
    ["div", null, "\n\n", ["p", null, "iOS-only content"], "\n"],
    "\n\n",
    null,
    "\n",
  ]);

  expect(
    // eslint-disable-next-line
    // @ts-ignore
    (await import(hashPath("./api/q/platform/js/content.json"))).body,
  ).toEqual([
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
