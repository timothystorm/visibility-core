export type RemoteModule = {
  mount: (el?: HTMLElement | null) => void | Promise<void>;
  unmount: (el?: HTMLElement | null) => void | Promise<void>;
};
