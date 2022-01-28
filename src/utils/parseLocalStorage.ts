export function parseLocalStorage(key: string, fallback: any): any {
  if (typeof localStorage === "undefined") return fallback;

  const result = localStorage.getItem(key);
  if (!result) {
    return fallback;
  }
  return JSON.parse(result);
}
