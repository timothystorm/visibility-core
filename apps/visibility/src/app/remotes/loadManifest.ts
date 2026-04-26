import { RemoteManifest } from '../types/remoteManifest';

const manifestURL = import.meta.env.DEV
  ? new URLSearchParams(globalThis.location.search).get('manifest_url') ||
    import.meta.env.VITE_MANIFEST_URL
  : '/remotes.manifest.json';

let cachedManifest: RemoteManifest | null = null;
export async function loadManifest(): Promise<RemoteManifest> {
  if (cachedManifest) return cachedManifest;
  const res = await fetch(new URL(manifestURL, import.meta.url));
  if (!res.ok) throw new Error(`Failed to load remote manifest (${res.status})`);
  return (cachedManifest = (await res.json()) as RemoteManifest);
}
