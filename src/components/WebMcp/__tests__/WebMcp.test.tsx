import * as React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { WebMcp } from '../WebMcp';

describe('WebMcp', () => {
  afterEach(() => {
    // Remove any modelContext shim we attached during a test.
    delete (document as unknown as { modelContext?: unknown }).modelContext;
    jest.restoreAllMocks();
  });

  it('is a no-op when the WebMCP API is unavailable', () => {
    const { container } = render(
      <WebMcp route="/react/build-a-backend/auth/set-up-auth/" />
    );
    expect(container.innerHTML).toBe('');
  });

  it('registers read-only tools when document.modelContext exists', async () => {
    const registerTool = jest.fn().mockResolvedValue(undefined);
    (document as unknown as { modelContext: unknown }).modelContext = {
      registerTool
    };

    await act(async () => {
      render(<WebMcp route="/react/build-a-backend/auth/set-up-auth/" />);
    });

    await waitFor(() => expect(registerTool).toHaveBeenCalled());

    const toolNames = registerTool.mock.calls.map((c) => c[0].name);
    expect(toolNames).toContain('get_current_page_markdown');
    expect(toolNames).toContain('get_documentation_index');

    // Each registered tool must have the WebMCP-required fields.
    for (const [tool] of registerTool.mock.calls) {
      expect(typeof tool.name).toBe('string');
      expect(typeof tool.description).toBe('string');
      expect(typeof tool.execute).toBe('function');
      expect(tool.annotations.readOnlyHint).toBe(true);
    }
  });

  it('fetches the current page markdown when its tool is executed', async () => {
    const registerTool = jest.fn().mockResolvedValue(undefined);
    (document as unknown as { modelContext: unknown }).modelContext = {
      registerTool
    };
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '# Set up auth\n\nReal markdown content.'
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    await act(async () => {
      render(<WebMcp route="/react/build-a-backend/auth/set-up-auth/" />);
    });
    await waitFor(() => expect(registerTool).toHaveBeenCalled());

    const pageTool = registerTool.mock.calls
      .map((c) => c[0])
      .find((t) => t.name === 'get_current_page_markdown');
    const result = await pageTool.execute({});

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/ai/pages/build-a-backend/auth/set-up-auth.md'),
      expect.anything()
    );
    expect(result).toEqual({
      markdown: '# Set up auth\n\nReal markdown content.'
    });
  });

  it('registers the second tool even if the first registration rejects', async () => {
    const registerTool = jest
      .fn()
      .mockRejectedValueOnce(new Error('duplicate tool name'))
      .mockResolvedValueOnce(undefined);
    (document as unknown as { modelContext: unknown }).modelContext = {
      registerTool
    };

    await act(async () => {
      render(<WebMcp route="/react/build-a-backend/auth/set-up-auth/" />);
    });

    await waitFor(() => expect(registerTool).toHaveBeenCalledTimes(2));

    const toolNames = registerTool.mock.calls.map((c) => c[0].name);
    expect(toolNames).toContain('get_current_page_markdown');
    expect(toolNames).toContain('get_documentation_index');
  });
});
