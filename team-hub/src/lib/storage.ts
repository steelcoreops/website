import { createContext, useContext } from 'react';
import { isConfigured, supabase } from './supabase';
import type { StoredFile } from './types';

const BUCKET = 'hub-files';
const MAX_BYTES = 50 * 1024 * 1024;
const LINK_SECONDS = 60 * 60;

/** The space a page being edited belongs to. Uploads are filed under it; null means uploads are unavailable. */
export const UploadSpace = createContext<string | null>(null);
export const useUploadSpace = () => useContext(UploadSpace);

export const uploadsAvailable = isConfigured;

export async function uploadFile(spaceId: string, file: File): Promise<StoredFile> {
  if (file.size > MAX_BYTES) throw new Error(`${file.name} is over the 50 MB limit.`);
  const safe = file.name.replace(/[^\w.\- ]+/g, '').trim() || 'file';
  const path = `${spaceId}/${crypto.randomUUID()}/${safe}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type || undefined });
  if (error) throw new Error(error.message);
  return { name: file.name, path, size: file.size };
}

// Signed links last an hour; reuse them for most of that so pages do not refetch on every render.
const cache = new Map<string, { url: string; expires: number }>();

export async function signedUrls(paths: string[]): Promise<Map<string, string>> {
  const now = Date.now();
  const missing = [...new Set(paths)].filter((p) => (cache.get(p)?.expires ?? 0) < now);
  if (missing.length) {
    const { data } = await supabase.storage.from(BUCKET).createSignedUrls(missing, LINK_SECONDS);
    for (const row of data ?? []) {
      if (row.path && row.signedUrl) cache.set(row.path, { url: row.signedUrl, expires: now + (LINK_SECONDS - 300) * 1000 });
    }
  }
  return new Map(paths.flatMap((p) => (cache.has(p) ? [[p, cache.get(p)!.url] as const] : [])));
}

export async function downloadUrl(file: StoredFile): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(file.path, LINK_SECONDS, { download: file.name });
  if (error || !data) throw new Error(error?.message ?? 'Could not open the file.');
  return data.signedUrl;
}

export const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
