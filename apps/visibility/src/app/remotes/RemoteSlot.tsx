import { useEffect, useRef, useState } from 'react';
import { RemoteModule } from '../types/remoteModule';
import { loadRemote } from './loadRemotes';
import { loadManifest } from './loadManifest';

/**
 * Lazy load and mount a remote module into a slot. Displays loading and error states.
 * The remote module is expected to export a `mount` function that takes a DOM element
 * and an optional `unmount` function for cleanup.
 */

/**
 * State of slot loading
 */
type SlotState =
  | { status: 'loading' }
  | { status: 'mounted' }
  | { status: 'error'; error: Record<string, any> };
export interface RemoteSlotProps {
  remoteName: string;
}

/**
 * A slot component that loads and mounts a remote module.
 * Passes the shared visibility store to enable cross-MFE communication.
 */
export function RemoteSlot({ remoteName }: RemoteSlotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<SlotState>({ status: 'loading' });

  // Track the loaded module so we can re-mount on store/i18n changes
  // without reloading the module from the network.
  const modRef = useRef<RemoteModule | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    containerRef.current?.appendChild(el);

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const manifest = await loadManifest();
        if (cancelled) return;
        const mod = await loadRemote(remoteName, manifest);

        if (cancelled) return;
        modRef.current = mod;

        // Pass the store and i18n instance to the remote module
        mod.mount(el);
        cleanup = () => mod.unmount?.(el);

        setState({ status: 'mounted' });
      } catch (err: unknown) {
        if (cancelled) return;
        setState({
          status: 'error',
          error: {
            stage: 'load',
            message:
              err instanceof Error ? err.message : 'Unknown remote error',
            cause: err,
          },
        });
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
      el.remove();
    };
  }, [remoteName]);

  if (state.status === 'error') {
    return <h3 style={{ color: 'red' }}>{state.error?.message}</h3>;
  }

  return <div ref={containerRef} />;
}
