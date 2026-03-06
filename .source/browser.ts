// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../src/docs/index.mdx?collection=docs"), "guides/index.mdx": () => import("../src/docs/guides/index.mdx?collection=docs"), "reference/index.mdx": () => import("../src/docs/reference/index.mdx?collection=docs"), "reference/mainentance-policy/index.mdx": () => import("../src/docs/reference/mainentance-policy/index.mdx?collection=docs"), }),
};
export default browserCollections;