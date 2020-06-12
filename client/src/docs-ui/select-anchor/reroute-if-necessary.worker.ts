import {parseURL} from "../../utils/url/url.worker";

const rereouteCache = new Map<string, string>();

export const rerouteIfNecessary = async (path: string) => {
  if (rereouteCache.has(path)) {
    return rereouteCache.get(path);
  }
  const rerouted = await (async () => {
    if (
      path.includes("/lib") &&
      (path.includes("/q/platform/ios") || path.includes("/q/platform/android"))
    ) {
      return `/lib/q/platform/${(await parseURL(path)).params
        ?.platform as string}`;
    }
    return path;
  })();
  rereouteCache.set(path, rerouted);
  return rerouted;
};
