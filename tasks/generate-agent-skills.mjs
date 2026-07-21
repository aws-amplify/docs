import { promises as fs } from 'fs';
import path from 'path';
import { DOMAIN, ROOT_PATH, CANONICAL_PLATFORM } from './build-constants.mjs';

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
      url: `${domain}/${CANONICAL_PLATFORM}/develop-with-ai/agent-plugins/`
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
    // Fail the build: the global Link header advertises this file, so shipping
    // without it would point agents at a 404.
    console.error(`Error writing agent-skills index to ${indexPath}:`, error);
    throw error;
  }
}
