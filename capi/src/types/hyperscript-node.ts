export type Props = null | Record<string, unknown>;
export type OrText<T> = T | string;
export type HyperscriptNode = OrText<[string, Props, ...HyperscriptNode[]]>;
