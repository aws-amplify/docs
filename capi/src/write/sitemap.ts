import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

function createSitemapRoute(route: string): string {
  return ` <url>
    <loc>https://docs.amplify.aws${route}</loc>
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

  if (routes.size > 0) {
    const routesSorted = [...routes.keys()];
    routesSorted.sort();

    const src = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routesSorted.map(createSitemapRoute).join(`\n `)}
</urlset>
`;

    const siteMapDest = path.join(config.srcDir, "sitemap.xml");
    await fs.ensureDir(config.srcDir);
    await fs.writeFile(siteMapDest, src, {
      encoding: "utf8",
    });
  } else {
    throw new Error("No routes exist. Add content.");
  }
}
