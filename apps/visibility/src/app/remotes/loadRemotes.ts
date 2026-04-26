import { RemoteModule } from '../types/remoteModule';
import { RemoteManifest } from '../types/remoteManifest';

function resolveRemoteUrl(
  remoteName: string,
  manifest: RemoteManifest,
): string {
  const remote = manifest.remotes[remoteName];
  if (!remote) throw new Error(`Remote ${remoteName} not found`);
  return remote['current'];
}

function isRemoteModule(mod: unknown): mod is RemoteModule {
  return (
    mod !== null &&
    typeof mod === 'object' &&
    'mount' in (mod as never) &&
    typeof (mod as any).mount === 'function' &&
    'unmount' in (mod as never) &&
    typeof (mod as any).unmount === 'function'
  );
}

export async function loadRemote(
  remoteName: string,
  manifest: RemoteManifest,
  cacheBust?: string,
): Promise<RemoteModule> {
  const baseUrl = resolveRemoteUrl(remoteName, manifest);
  if (!baseUrl) throw new Error(`No URL found for remote "${remoteName}"`);

  // Append cache-bust param so the browser treats each retry as a distinct URL.
  const url = cacheBust ? `${baseUrl}?_t=${cacheBust}` : baseUrl;

  // Native ESM import
  const mod = await import(/* @vite-ignore */ url);

  // runtime validation of the remote module structure
  if (!isRemoteModule(mod)) {
    throw new Error(
      `Remote "${remoteName}" does not export a valid RemoteModule`,
    );
  }

  return mod as RemoteModule;
}
