import { createContext } from 'react';
// Setup file to extend jest-dom, referenced in packages.json under "jest"
import '@testing-library/jest-dom';

// Adding this doMock help mock next/link in MDXLink.test.tsx
// From here: https://github.com/vercel/next.js/issues/43769#issuecomment-1735620746
jest.doMock('next/dist/shared/lib/router-context.shared-runtime.js', () => ({
  RouterContext: createContext(true)
}));

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}
