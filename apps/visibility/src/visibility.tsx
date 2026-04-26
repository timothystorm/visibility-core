import App from './app/app';
import { createRoot, Root } from 'react-dom/client';

const rootRegistry = new WeakMap<HTMLElement, Root>();

export async function mount(el: HTMLElement | null): Promise<Root | void> {
  if (!el) throw new Error('Element not found - cannot mount visibility');

  let root = rootRegistry.get(el);
  if (root) root.render(<App />);
  else {
    root = createRoot(el);
    rootRegistry.set(el, root);
    return root.render(<App />);
  }
}

export async function unmount(el?: HTMLElement | null) {
  if (!el) return;
  rootRegistry.get(el)?.unmount();
  rootRegistry.delete(el);
}
