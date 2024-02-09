import { createContext } from 'react';
// Setup file to extend jest-dom, referenced in packages.json under "jest"
import '@testing-library/jest-dom';

jest.doMock('next/dist/shared/lib/router-context.shared-runtime.js', () => ({
  RouterContext: createContext(true)
}));

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}
