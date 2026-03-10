import { writeSitemap, writeRobots } from './generate-sitemap.mjs';
import { generateLlmsTxt } from './generate-llms-txt.mjs';

await writeSitemap();
await writeRobots();
await generateLlmsTxt();
