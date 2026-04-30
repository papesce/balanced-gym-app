export function imgUrl(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `/img/${path}`;
}
