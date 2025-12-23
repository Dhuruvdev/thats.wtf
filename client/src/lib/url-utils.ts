/**
 * Convert relative URLs to absolute URLs for media playback in iframe environments
 */
export function resolveMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  
  // If already absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If relative path, convert to absolute using current location
  if (url.startsWith('/')) {
    const { protocol, host } = window.location;
    return `${protocol}//${host}${url}`;
  }
  
  return url;
}
