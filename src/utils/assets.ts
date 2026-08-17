/** Resolve a file from Vite's public directory under the configured deployment base. */
export function publicAsset(path: string): string {
  if (/^(?:https?:|data:)/.test(path)) return path;
  const relativePath = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${relativePath}`;
}
