import * as path from "path";
import {PathDeduction} from "../../path-deduction";

const assetPath = path.join(__dirname, "images/image.svg");
const parentPagePath = path.join(__dirname, "parent/parent.md");
const childPagePath = path.join(__dirname, "parent/child/child.md");

const config = {
  cwd: __dirname,
  contentDir: "content",
  filters: {
    platform: ["android", "ios", "js"],
    framework: ["angular", "ionic", "react", "react-native", "vue"],
  },
  outDir: "api",
  publicDir: "www",
  srcDir: "",
};

test("PathDeduction", () => {
  expect(new PathDeduction(assetPath, config)).toEqual({
    isMenu: false,
    srcPath: `${__dirname}/images/image.svg`,
    grandParentDir: __dirname,
    extension: ".svg",
    fileName: "image",
    folderName: "images",
    relativeToContentDir: "../src/__tests__/path-deduction/images/image.svg",
    destinationPath: "src/__tests__/path-deduction/images/image.svg",
    uri: "/../src/__tests__/path-deduction/images/image.svg",
  });

  expect(new PathDeduction(parentPagePath, config)).toEqual({
    isMenu: false,
    srcPath: `${__dirname}/parent/parent.md`,
    grandParentDir: __dirname,
    extension: ".md",
    fileName: "parent",
    folderName: "parent",
    relativeToContentDir: "../src/__tests__/path-deduction/parent/parent.md",
    route: "/../src/__tests__/path-deduction/parent",
    destinationPath: "src/__tests__/path-deduction/parent/parent.json",
  });

  expect(new PathDeduction(childPagePath, config)).toEqual({
    isMenu: false,
    srcPath: `${__dirname}/parent/child/child.md`,
    grandParentDir: `${__dirname}/parent`,
    extension: ".md",
    fileName: "child",
    folderName: "child",
    relativeToContentDir:
      "../src/__tests__/path-deduction/parent/child/child.md",
    route: "/../src/__tests__/path-deduction/parent/child",
    destinationPath: "src/__tests__/path-deduction/parent/child/child.json",
  });
});
