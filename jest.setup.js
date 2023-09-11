// Setup file to extend jest-dom, referenced in packages.json under "jest"
import '@testing-library/jest-dom';

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}
