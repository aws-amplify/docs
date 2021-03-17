import * as t from "./types";
import fg from "fast-glob";
import * as path from "path";
import {PathDeduction} from "./path-deduction";
import {initNode} from "./init-node";
import traverse from "traverse";
import * as visitors from "./visitors";
import * as write from "./write";
import {watch} from "chokidar";
import * as fs from "fs-extra";
import {WrittenMenu} from "./types";
import {getPathsOfDepth} from "./utils";
import {
  injectFilteredVersionRoutes,
  injectMenu,
  injectNextAndPreviousLinks,
} from "./inject";

let alreadyWatching = false;

export async function API(c: t.Config): Promise<void> {
  !alreadyWatching &&
    console.log("`capi` compiling ".concat(`${c.contentDir}`));

  // normalize config dirs to be absolute paths
  const config = {...c};
  !config.cwd && (config.cwd = process.cwd());
  config.contentDir = path.join(config.cwd, config.contentDir);
  config.outDir = path.join(config.cwd, config.outDir);
  config.publicDir = path.join(config.cwd, config.publicDir);
  config.srcDir = path.join(config.cwd, config.srcDir);

  /**
   * Define the `PathDeductionBySrcPath` map here, so that we can make use
   * of it within `resolvePathDeduction`, which we'll also add into the `Ctx`
   * below.
   */
  const pathDeductionBySrcPath: t.PathDeductionBySrcPath = new Map();

  /**
   * `resolvePathDeduction` lets use reliably gather path a given asset's
   * `PathDeduction` relative to other assets (or aliased from the root
   * with a tilda). If the given file DNE, we throw an error here. This way,
   * the type signature stays as `string`.
   */
  const resolvePathDeduction: t.ResolvePathDeduction = (
    reference,
    relativeTo,
    assetType,
  ) => {
    const [maybeTilda, ...pathPieces] = reference.split(path.sep);
    const srcPath =
      maybeTilda === "~"
        ? path.join(config.contentDir, ...pathPieces)
        : path.join(path.dirname(relativeTo), reference);
    const pathDeduction = pathDeductionBySrcPath.get(srcPath);
    if (!pathDeduction) {
      throw new Error(
        `Referenced non-existent ${assetType ||
          "file"} "${srcPath}" from "${relativeTo} in "${reference}"`,
      );
    }
    return pathDeduction;
  };

  /**
   * deduce the root page src path for use elsewhere
   */
  const rootFolderName = config.contentDir.split(path.sep).pop();
  const rootPageSrcPath = [config.contentDir, `${rootFolderName}.md`].join(
    path.sep,
  );

  /**
   * Placing these dictionaries / helpers in a single `Ctx` object makes it easy
   * to pass as an argument elsewhere
   */
  const ctx: t.Ctx = {
    config,
    srcPaths: new Array<string>(),
    resolvePathDeduction,
    pathDeductionBySrcPath,
    pageBySrcPath: new Map(),
    filteredPagePathByRoute: new Map(),
    fragmentBySrcPath: new Map(),
    srcPathByRoute: new Map(),
    menuBySrcPath: new Map(),
    pageSrcPaths: [],
    contentDirDepth: config.contentDir.split(path.sep).length,
    productDirs: [],
    rootPageSrcPath,
  };

  /**
   * We block the thread until all `PathDeductions` have been gathered. It's important
   * that we have all of this info accessible before we process the source files. Otherwise,
   * we'll need to implement callback hell to wait for asset-referencing assets to
   * to have the data they need.
   */
  await (async (): Promise<void> => {
    for await (const chunk of fg.stream(path.join(config.contentDir, "**/*"), {
      cwd: config.cwd,
      absolute: true,
      ignore: c.exclude,
    })) {
      // we make the given path deduction available in the `ctx`
      const srcPath = chunk.toString();
      if (srcPath.includes("/q/")) {
        throw new Error(
          `Source path "${srcPath}" contains "q" as ancestor directory (invalid)`,
        );
      }
      ctx.srcPaths.push(srcPath);
      const pathDeduction = new PathDeduction(srcPath, config);
      ctx.pathDeductionBySrcPath.set(srcPath, pathDeduction);
      if (pathDeduction.route) {
        ctx.srcPathByRoute.set(pathDeduction.route, srcPath);
        ctx.pageSrcPaths.push(srcPath);
      }
      pathDeduction.isMenu &&
        ctx.menuBySrcPath.set(
          srcPath,
          JSON.parse(await fs.readFile(srcPath, "utf-8")) as WrittenMenu,
        );
    }
  })();

  /**
   * Get the list of product-level directories (our menu roots) and save to ctx
   */
  ctx.productDirs = getPathsOfDepth(
    ctx.pageSrcPaths,
    ctx.contentDirDepth + 2,
  ).map((pageSrcPath) => {
    const pieces = pageSrcPath.split(path.sep);
    pieces.pop();
    return pieces.join(path.sep);
  });

  /**
   * We load (and parse / hyperscript-encode) all source files into memory.
   * This fills `ctx` with all pages and fragments.
   */
  await Promise.all(
    [...ctx.pathDeductionBySrcPath.keys()].map((srcPath) =>
      initNode(srcPath, ctx),
    ),
  );

  /**
   * We then iterate through all pages...
   */
  for (const [srcPath, page] of ctx.pageBySrcPath) {
    const pathDeduction = ctx.pathDeductionBySrcPath.get(srcPath);
    if (pathDeduction) {
      if (pathDeduction.route) {
        page.route = pathDeduction.route;
      }
      page.relativeToContentDir = pathDeduction.relativeToContentDir;
    }

    [
      /**
       * We––before anything else––inline all fragments, so that other transforms get
       * applied to those fragments (which will have become part of the page body) as well.
       * We also copy any `render-if` conditions to the given `Page` instance's `filters`.
       */
      [visitors.fragmentTags, visitors.docsFilter],
      [
        /**
         * Any non-absolute links need to be resolved to the route resulting from
         * the referenced file.
         */
        visitors.links,
        /**
         * Any non-absolute image references need to be resolved to the uri (public-relative
         * directory) to which they've been copied.
         */
        visitors.imageReferences,
        /**
         * Any `render-if`s encountered need to accounted for in the given `Page` instance's
         * `filters` manifest
         */
      ],
    ].forEach((visitorGroup) => {
      traverse(page.body).forEach(function(node) {
        // eslint-disable-next-line
        const lexicalScope = this;
        const props: t.TransformerProps = {
          node,
          srcPath,
          lexicalScope,
          ctx,
          page,
          config,
        };

        visitorGroup.map((visit) => visit(props));
      });
    });

    // add additional filters if we encounter any filter-agnostic content (so that it isn't unintentionally hidden)
    if (
      ((): boolean => {
        for (const node of page.body) {
          if (Array.isArray(node)) {
            const [tag, , firstChild] = node;
            const filterChildTag = firstChild?.[0];
            if (!(tag === "div" && filterChildTag === "docs-filter-target")) {
              return true;
            }
          }
        }
        return false;
      })() &&
      page.filters
    ) {
      const [filterKey] = Object.keys(page.filters);
      page.filters = {[filterKey]: ctx.config.filters[filterKey]} as Record<
        string,
        string[]
      >;
    }

    if (page.filters) {
      Object.values(page.filters).forEach((a) => a.sort());
    }
  }

  /**
   * internally mutates page state with a complete menu, versions, and next and previous
   */
  [
    injectMenu,
    injectFilteredVersionRoutes,
    injectNextAndPreviousLinks,
  ].forEach((fn) => fn(ctx));

  /**
   * We iterate through and write all pages, routes, types and utilities to the `outDir`.
   */
  await write.pages(ctx);
  await Promise.all([
    write.getPage(config, ctx),
    write.routes(config, ctx),
    write.types(config),
    write.stencilRenderer(config),
    write.filtersByRoute(config, ctx),
    write.index(config),
    write.sitemap(config, ctx),
  ]);

  console.log("`capi` compilation complete");

  config.hooks?.onTargetsWritten && config.hooks?.onTargetsWritten();

  if (!alreadyWatching && config.watch) {
    alreadyWatching = true;

    const run = (event: string, path: string): void => {
      console.log("`capi` recompiling ".concat(`(${event} at ${path})`));
      API(c);
    };

    watch(`${config.contentDir}/**/*`, {
      cwd: config.cwd,
      usePolling: false,
      ignoreInitial: true,
      followSymlinks: true,
      awaitWriteFinish: true,
    }).on("all", run);

    config.hooks?.onWatching && config.hooks?.onWatching();
    console.log("`capi` watching for changes");
  }
}
