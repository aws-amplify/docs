import { writeSitemap, writeRobots } from './generate-sitemap.mjs';
import { writeApiCatalog } from './generate-wellknown.mjs';

await writeSitemap();
await writeRobots();
await writeApiCatalog();
