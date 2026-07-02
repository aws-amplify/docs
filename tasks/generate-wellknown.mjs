import { promises as fs } from 'fs';
import path from 'path';
import { DOMAIN, ROOT_PATH } from './build-constants.mjs';

/**
 * Build the API catalog linkset document (RFC 9727 / RFC 9264).
 *
 * This is a documentation site rather than a hosted API, so the catalog
 * advertises the machine-readable documentation resources the build already
 * produces instead of an OpenAPI service description, which does not exist for
 * this site. The relations map to the RFC 9727 link relations:
 *   - service-desc: llms-full.txt, the complete machine-readable export that
 *     best stands in for a service description for an agent.
 *   - service-doc: llms.txt, the human/agent-readable documentation index.
 *   - service-meta: the sitemap, which enumerates the catalog's pages.
 *
 * Each relation is an array of { href, type } objects per RFC 9727 Appendix A.
 *
 * @returns {string} Pretty-printed application/linkset+json document
 */
export function generateApiCatalog(domain = DOMAIN) {
  const linkset = {
    linkset: [
      {
        anchor: `${domain}/`,
        'service-desc': [
          {
            href: `${domain}/ai/llms-full.txt`,
            type: 'text/plain',
            title: 'AWS Amplify documentation full export for LLMs'
          }
        ],
        'service-doc': [
          {
            href: `${domain}/ai/llms.txt`,
            type: 'text/plain',
            title: 'AWS Amplify documentation index for LLMs (llms.txt)'
          }
        ],
        'service-meta': [
          {
            href: `${domain}/sitemap.xml`,
            type: 'application/xml',
            title: 'Sitemap'
          }
        ]
      }
    ]
  };

  return JSON.stringify(linkset, null, 2);
}

/**
 * Writes the API catalog to the build output.
 *
 * The file is written with a `.json` extension (api-catalog.json) because the
 * site builds with `trailingSlash: true`: Amplify Hosting 301-redirects
 * extensionless paths (e.g. /.well-known/api-catalog) to a trailing-slash URL
 * that has no corresponding file, returning 404. Files with an extension are
 * served directly with a 200. A 200-rewrite in redirects.json maps the
 * RFC 9727 canonical path /.well-known/api-catalog to this file so the
 * extensionless path resolves with a 200 in place.
 */
export async function writeApiCatalog() {
  const wellKnownDir = path.join(ROOT_PATH, '.well-known');
  const catalogPath = path.join(wellKnownDir, 'api-catalog.json');

  try {
    await fs.mkdir(wellKnownDir, { recursive: true });
    await fs.writeFile(catalogPath, generateApiCatalog());
    console.log(`api-catalog written to ${catalogPath}`);
  } catch (error) {
    // Fail the build: the global Link header advertises this file, so shipping
    // without it would point agents at a 404.
    console.error(`Error writing api-catalog to ${catalogPath}:`, error);
    throw error;
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
    // Fail the build: the global Link header advertises this file, so shipping
    // without it would point agents at a 404.
    console.error(`Error writing mcp server-card to ${cardPath}:`, error);
    throw error;
  }
}
