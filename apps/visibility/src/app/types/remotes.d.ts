export type RemoteModule = {
  mount: (el?: HTMLElement | null) => void | Promise<void>;
  unmount: (el?: HTMLElement | null) => void | Promise<void>;
};

export interface RemoteManifest {
  remotes: Record<
    string,
    {
      current: string;
      next?: string;
      [key: string]: string | undefined | null;
    }
  >;
}
