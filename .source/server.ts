// @ts-nocheck
import * as __fd_glob_3 from "../src/docs/reference/mainentance-policy/index.mdx?collection=docs"
import * as __fd_glob_2 from "../src/docs/reference/index.mdx?collection=docs"
import * as __fd_glob_1 from "../src/docs/guides/index.mdx?collection=docs"
import * as __fd_glob_0 from "../src/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "src/docs", {}, {"index.mdx": __fd_glob_0, "guides/index.mdx": __fd_glob_1, "reference/index.mdx": __fd_glob_2, "reference/mainentance-policy/index.mdx": __fd_glob_3, });