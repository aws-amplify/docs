export const NODE_PACKAGE_MANAGERS = {
  npm: 'npm',
  yarn: 'yarn',
  pnpm: 'pnpm'
  // bun: 'bun'
} as const;

export const DEFAULT_NODE_PACKAGE_MANAGER = NODE_PACKAGE_MANAGERS.npm;
export type NodePackageManager = keyof typeof NODE_PACKAGE_MANAGERS;
