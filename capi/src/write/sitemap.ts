import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

const now = new Date();
const yyyyMmDd = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

function createSitemapRoute(route: string): string {
  return ` <url>
    <loc>http://docs.amplify.aws${route}</loc>
    <lastmod>${yyyyMmDd}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>.5</priority>
  </url>`;
}

export async function sitemap(config: t.Config, ctx: t.Ctx): Promise<void> {
  const routes = new Map<string, true>();

  for (const [, page] of ctx.pageBySrcPath.entries()) {
    routes.set(page.route, true);
    if (page.versions) {
      Object.entries(page.versions).forEach(([, version]) =>
        routes.set(version, true),
      );
    }
  }

  const src = `<?xml version="1.0" encoding="utf-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...routes.keys()].map(createSitemapRoute).join("\n")}
</urlset>
`;

  const destPathPieces = config.outDir.split(path.sep);
  destPathPieces.pop();
  const destPath = destPathPieces.join(path.sep);
  await fs.ensureDir(destPath);
  await fs.writeFile(path.join(destPath, "sitemap.xml"), src, {
    encoding: "utf8",
  });
}
