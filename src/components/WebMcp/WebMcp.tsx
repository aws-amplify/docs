import { useEffect } from 'react';
import { getMarkdownUrl, fetchPageMarkdown } from '@/components/MarkdownMenu';

/**
 * Minimal shape of the WebMCP API we depend on. The spec exposes
 * `document.modelContext.registerTool`; some early implementations also alias
 * it on `navigator.modelContext`. We feature-detect both and treat the API as
 * entirely optional so this is a silent no-op in browsers without WebMCP.
 *
 * See https://webmachinelearning.github.io/webmcp/
 */
interface ModelContextTool {
  name: string;
  description: string;
  inputSchema?: object;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<unknown>;
}

interface ModelContextLike {
  registerTool: (
    tool: ModelContextTool,
    options?: { signal?: AbortSignal }
  ) => Promise<void>;
}

function getModelContext(): ModelContextLike | null {
  if (typeof document !== 'undefined') {
    const fromDoc = (document as unknown as { modelContext?: ModelContextLike })
      .modelContext;
    if (fromDoc?.registerTool) return fromDoc;
  }
  if (typeof navigator !== 'undefined') {
    const fromNav = (navigator as unknown as { modelContext?: ModelContextLike })
      .modelContext;
    if (fromNav?.registerTool) return fromNav;
  }
  return null;
}

/**
 * Register a single tool, isolating failures so one rejected registration
 * (e.g. a transient duplicate-name error during abort/re-register on fast
 * client-side navigation) can't prevent the others from registering.
 */
async function safeRegister(
  modelContext: ModelContextLike,
  tool: ModelContextTool,
  signal: AbortSignal
): Promise<void> {
  try {
    await modelContext.registerTool(tool, { signal });
  } catch {
    // Registration is best-effort; ignore failures for this tool.
  }
}

/**
 * Registers read-only WebMCP tools that expose this documentation site's key
 * actions to in-browser AI agents. Every tool is backed by content the site
 * already generates (the per-page markdown twins under /ai/pages and the
 * llms.txt index), so the tools return real data rather than stubs.
 *
 * Renders nothing; the registration happens as a side effect on mount and is
 * torn down via an AbortSignal on unmount.
 */
export function WebMcp({ route }: { route: string }) {
  useEffect(() => {
    const modelContext = getModelContext();
    if (!modelContext) return;

    const controller = new AbortController();
    const { signal } = controller;
    const origin = window.location.origin;

    // Each tool is registered independently so one failure can't block the rest.
    safeRegister(
      modelContext,
      {
        name: 'get_current_page_markdown',
        description:
          'Return the current AWS Amplify documentation page as clean Markdown, ideal for reading or summarizing without HTML chrome.',
        inputSchema: { type: 'object', properties: {} },
        annotations: { readOnlyHint: true },
        execute: async () => {
          const markdown = await fetchPageMarkdown(origin + getMarkdownUrl(route));
          return { markdown };
        }
      },
      signal
    );

    safeRegister(
      modelContext,
      {
        name: 'get_documentation_index',
        description:
          'Return the AWS Amplify documentation index (llms.txt), a Markdown list of all documentation pages with descriptions and links to their Markdown versions.',
        inputSchema: { type: 'object', properties: {} },
        annotations: { readOnlyHint: true },
        execute: async () => {
          const index = await fetchPageMarkdown(origin + '/ai/llms.txt');
          return { index };
        }
      },
      signal
    );

    return () => controller.abort();
  }, [route]);

  return null;
}
