/** Turns a share link from a supported service into an embeddable address, or null if it is not one we know. */
export function embedUrl(raw: string): string | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.replace(/^www\./, '');
  const parts = url.pathname.split('/').filter(Boolean);

  if (host === 'youtube.com' && url.searchParams.get('v')) return `https://www.youtube-nocookie.com/embed/${url.searchParams.get('v')}`;
  if (host === 'youtube.com' && parts[0] === 'shorts' && parts[1]) return `https://www.youtube-nocookie.com/embed/${parts[1]}`;
  if (host === 'youtu.be' && parts[0]) return `https://www.youtube-nocookie.com/embed/${parts[0]}`;
  if (host === 'loom.com' && (parts[0] === 'share' || parts[0] === 'embed') && parts[1]) return `https://www.loom.com/embed/${parts[1]}`;
  if (host === 'vimeo.com' && /^\d+$/.test(parts[0] ?? '')) return `https://player.vimeo.com/video/${parts[0]}`;
  if (host === 'docs.google.com' && parts[0] === 'forms') return `https://docs.google.com/${parts.slice(0, -1).join('/')}/viewform?embedded=true`;
  if (host === 'docs.google.com' && ['document', 'presentation', 'spreadsheets'].includes(parts[0] ?? '')) {
    const id = parts.indexOf('d');
    if (id >= 0 && parts[id + 1]) return `https://docs.google.com/${parts.slice(0, id + 2).join('/')}/preview`;
  }
  if (host === 'drive.google.com' && parts[0] === 'file' && parts[2]) return `https://drive.google.com/file/d/${parts[2]}/preview`;
  if (host === 'figma.com' && ['file', 'design', 'proto', 'board'].includes(parts[0] ?? '')) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url.href)}`;
  }
  return null;
}

/** Google Docs and Slides read better in a taller frame than video does. */
export const isDocument = (embed: string) => /docs\.google\.com|drive\.google\.com|figma\.com/.test(embed);
