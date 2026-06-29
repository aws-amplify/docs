import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.custom' });

const DOMAIN = process.env.SITEMAP_DOMAIN
  ? process.env.SITEMAP_DOMAIN
  : 'https://docs.amplify.aws';

// Path of the Next.js static HTML build output (same target used for
// robots.txt, sitemap.xml, and the API catalog in postBuildTasks).
const ROOT_PATH = './client/www/next-build';

// Agent Skills Discovery RFC v0.2.0 well-known location.
const INDEX_SUBPATH = '.well-known/agent-skills/index.json';
const SCHEMA_URL = 'https://agentskills.io/schema/v0.2.0/index.json';

/**
 * The agent skills AWS Amplify publishes. These are real, maintained artifacts
 * in the awslabs/agent-plugins repository, surfaced to users through the
 * Claude Code and Cursor plugin marketplaces and documented under
 * /develop-with-ai/agent-plugins.
 *
 * `name` and `description` mirror the upstream SKILL.md frontmatter so the
 * index stays consistent with the source of truth. `url` points at the docs
 * page that explains how to install and use the skill rather than at a raw
 * artifact, so no sha256 digest is published (the docs page is discovery and
 * install guidance, not the downloadable artifact itself).
 *
 * @param {string} domain Site origin to build doc URLs against
 * @returns {Array<object>} Skill entries for the discovery index
 */
function getSkills(domain) {
  return [
    {
      name: 'amplify-workflow',
      type: 'claude-skill',
      description:
        'Build and deploy full-stack web and mobile apps with AWS Amplify Gen2 (TypeScript code-first). Covers auth (Cognito), data (AppSync/DynamoDB), storage (S3), functions, APIs, and AI (Amplify AI Kit with Bedrock) across React, Next.js, Vue, Angular, React Native, Flutter, Swift, and Android.',
      url: `${domain}/react/develop-with-ai/agent-plugins/`
    }
  ];
}

/**
 * Build the Agent Skills discovery index (Agent Skills Discovery RFC v0.2.0).
 *
 * @returns {string} Pretty-printed index.json document
 */
export function generateAgentSkillsIndex(domain = DOMAIN) {
  const index = {
    $schema: SCHEMA_URL,
    skills: getSkills(domain)
  };

  return JSON.stringify(index, null, 2);
}

/**
 * Writes the Agent Skills index to /.well-known/agent-skills/index.json in the
 * build output.
 */
export async function writeAgentSkillsIndex() {
  const indexPath = path.join(ROOT_PATH, INDEX_SUBPATH);

  try {
    await fs.mkdir(path.dirname(indexPath), { recursive: true });
    await fs.writeFile(indexPath, generateAgentSkillsIndex());
    console.log(`agent-skills index written to ${indexPath}`);
  } catch (error) {
    console.error(`Error writing agent-skills index to ${indexPath}:`, error);
  }
}
