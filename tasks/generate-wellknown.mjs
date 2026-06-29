import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.custom' });

const DOMAIN = process.env.SITEMAP_DOMAIN
  ? process.env.SITEMAP_DOMAIN
  : 'https://docs.amplify.aws';

// Path of the Next.js static HTML build output (same target used for
// robots.txt and sitemap.xml in postBuildTasks).
const ROOT_PATH = './client/www/next-build';

/**
 * Build the API catalog linkset document (RFC 9727 / RFC 9264).
 *
 * This is a documentation site rather than a hosted API, so the catalog
 * advertises the machine-readable documentation resources the build already
 * produces (the llms.txt index, the full export, and the sitemap) instead of
 * an OpenAPI service description, which does not exist for this site.
 *
 * @returns {string} Pretty-printed application/linkset+json document
 */
export function generateApiCatalog(domain = DOMAIN) {
  const linkset = {
    linkset: [
      {
        anchor: `${domain}/`,
        'service-doc': [
          {
            href: `${domain}/ai/llms.txt`,
            type: 'text/plain',
            title: 'AWS Amplify documentation index for LLMs (llms.txt)'
          },
          {
            href: `${domain}/ai/llms-full.txt`,
            type: 'text/plain',
            title: 'AWS Amplify documentation full export for LLMs'
          }
        ],
        related: [
          {
            href: `${domain}/sitemap.xml`,
            type: 'text/xml',
            title: 'Sitemap'
          }
        ]
      }
    ]
  };

  return JSON.stringify(linkset, null, 2);
}

/**
 * Writes the API catalog to /.well-known/api-catalog in the build output.
 */
export async function writeApiCatalog() {
  const wellKnownDir = path.join(ROOT_PATH, '.well-known');
  const catalogPath = path.join(wellKnownDir, 'api-catalog');

  try {
    await fs.mkdir(wellKnownDir, { recursive: true });
    await fs.writeFile(catalogPath, generateApiCatalog());
    console.log(`api-catalog written to ${catalogPath}`);
  } catch (error) {
    console.error(`Error writing api-catalog to ${catalogPath}:`, error);
  }
}

// The AWS Knowledge MCP Server is a fully managed, public (no-auth) remote MCP
// server that AWS hosts and that authoritatively indexes AWS Amplify
// documentation. See https://github.com/awslabs/mcp (aws-knowledge-mcp-server).
const AWS_KNOWLEDGE_MCP_ENDPOINT = 'https://knowledge-mcp.global.api.aws';

/**
 * Build the MCP Server Card (SEP-1649 style) for agent discovery.
 *
 * This documentation site does not run its own MCP server, so the card points
 * at the official AWS Knowledge MCP Server, which is AWS-managed, requires no
 * authentication, and indexes this site's content (AWS Amplify documentation).
 * It is a truthful pointer to the real server agents should connect to rather
 * than a claim that docs.amplify.aws is itself an MCP endpoint.
 *
 * @returns {string} Pretty-printed server card JSON document
 */
export function generateMcpServerCard() {
  const card = {
    serverInfo: {
      name: 'aws-knowledge-mcp-server',
      description:
        'Fully managed, public AWS Knowledge MCP Server hosted by AWS. Provides search and retrieval over the latest AWS documentation, including AWS Amplify documentation, plus AWS agent skills. This site (docs.amplify.aws) does not host its own MCP server; connect to the AWS-managed server below.'
    },
    transport: {
      type: 'http',
      endpoint: AWS_KNOWLEDGE_MCP_ENDPOINT
    },
    authentication: {
      required: false
    },
    capabilities: {
      tools: [
        'search_documentation',
        'read_documentation',
        'list_regions',
        'get_regional_availability',
        'retrieve_skill'
      ]
    },
    documentation: 'https://github.com/awslabs/mcp'
  };

  return JSON.stringify(card, null, 2);
}

/**
 * Writes the MCP server card to /.well-known/mcp/server-card.json in the build
 * output.
 */
export async function writeMcpServerCard() {
  const mcpDir = path.join(ROOT_PATH, '.well-known', 'mcp');
  const cardPath = path.join(mcpDir, 'server-card.json');

  try {
    await fs.mkdir(mcpDir, { recursive: true });
    await fs.writeFile(cardPath, generateMcpServerCard());
    console.log(`mcp server-card written to ${cardPath}`);
  } catch (error) {
    console.error(`Error writing mcp server-card to ${cardPath}:`, error);
  }
}
