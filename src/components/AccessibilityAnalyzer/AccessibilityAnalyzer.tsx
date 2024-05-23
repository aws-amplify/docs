import React from 'react';

export const AccessibilityAnalyzer = () => {
  if (
    typeof window !== 'undefined' &&
    process.env.BUILD_ENV !== 'production' &&
    process.env.BUILD_ENV !== 'staging'
  ) {
    Promise.all([import('@axe-core/react'), import('react-dom')]).then(
      ([axe, ReactDOM]) => axe.default(React, ReactDOM, 1000)
    );
  }
  return null;
};
