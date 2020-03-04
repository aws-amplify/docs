export interface Config {
  contentDir: string;
  cwd?: string;
  exclude?: string[];
  filters: Readonly<Record<Readonly<string>, Readonly<Readonly<string>[]>>>;
  hooks?: {
    onTargetsWritten?: () => {};
    onWatching?: () => {};
  };
  outDir: string;
  publicDir: string;
  transformer?: string;
  validation?: string;
  watch?: boolean;
}
