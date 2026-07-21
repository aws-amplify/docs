import { writeSitemap, writeRobots } from './generate-sitemap.mjs';
import { writeApiCatalog, writeMcpServerCard } from './generate-wellknown.mjs';
import { writeAgentSkillsIndex } from './generate-agent-skills.mjs';

await writeSitemap();
await writeRobots();
await writeApiCatalog();
await writeMcpServerCard();
await writeAgentSkillsIndex();
