export const accessibilityScanner = async (
  App,
  config?: Record<string, unknown>
): Promise<void> => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    const axe = await import('@axe-core/react');
    const ReactDOM = await import('react-dom');
    axe.default(App, ReactDOM, 1000, config);
  }
};
