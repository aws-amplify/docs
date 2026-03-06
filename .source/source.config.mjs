var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/pages/source.config.ts
var source_config_exports = {};
__export(source_config_exports, {
  default: () => source_config_default
});
import { defineConfig } from "fumadocs-mdx/config";
var source_config_default;
var init_source_config = __esm({
  "src/pages/source.config.ts"() {
    "use strict";
    source_config_default = defineConfig({
      mdxOptions: {
        providerImportSource: "@mdx-js/react"
      }
    });
  }
});

// source.config.ts
import {
  defineConfig as defineConfig2,
  defineDocs,
  frontmatterSchema,
  metaSchema
} from "fumadocs-mdx/config";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
var docs = defineDocs({
  docs: {
    schema: frontmatterSchema
  },
  meta: {
    schema: metaSchema
  },
  dir: "src/docs"
});
var source_config_default2 = defineConfig2({
  mdxOptions: {
    rehypePlugins: [
      [rehypeImgSize, { dir: "public" }],
      rehypeMdxCodeProps,
      rehypeSlug
    ],
    jsx: true
  },
  workspaces: {
    pages: {
      dir: "src/pages",
      config: await Promise.resolve().then(() => (init_source_config(), source_config_exports))
    }
  }
});
export {
  source_config_default2 as default,
  docs
};
