import React from 'react';

export const AccessibilityAnalyzer = () => {
  if (
    typeof window !== 'undefined' &&
    process.env.BUILD_ENV !== 'production' &&
    process.env.BUILD_ENV !== 'staging'
  ) {
    const config = {
      /* Rule descriptions: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md */
      runOnly: [
        'best-practice',
        'wcag2a',
        'wcag2aa',
        'wcag21a',
        'wcag21aa',
        'wcag22a',
        'wcag22aa'
      ]
    };
    Promise.all([import('@axe-core/react'), import('react-dom')]).then(
      ([axe, ReactDOM]) => {
        axe.default(React, ReactDOM, 1000, config);
      }
    );
  }
  return null;
};
