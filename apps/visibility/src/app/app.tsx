import { lazy, Suspense } from 'react';

const LazyRemoteSlot = lazy(() =>
  import('./remotes/RemoteSlot').then((m) => ({ default: m.RemoteSlot })),
);
export function App() {
  return (
    <>
      <h1>Visibility Shell</h1>
      <Suspense fallback={<div>loading...</div>}>
        <LazyRemoteSlot remoteName="monitor" />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <LazyRemoteSlot remoteName="overview" />
      </Suspense>
    </>
  );
}

export default App;
