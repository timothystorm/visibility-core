import { mount, unmount } from './overview';

/**
 * works in development and interacts with {app}/index.html
 */
document
  .getElementById('btn-mount')
  ?.addEventListener('click', async (): Promise<void> => {
    await Promise.all([
      mount(document.getElementById('root')).then(() => {
        console.info('🚦 Overview mounted');
      }),
    ]);
  });

document.getElementById('btn-unmount')?.addEventListener('click', () => {
  unmount(document.getElementById('root')).then(() =>
    console.info('⛓️‍💥 Overview unmounted'),
  );
});
