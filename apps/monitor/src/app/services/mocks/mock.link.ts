import { Observable } from '@apollo/client';
import type { FetchResult } from '@apollo/client';
import { SCENARIOS } from './scenarios';

export function resolveMock(scenario: string): Observable<FetchResult> {
  const data = SCENARIOS[scenario] ?? SCENARIOS['default'];
  return new Observable((observer) => {
    observer.next({ data });
    observer.complete();
  });
}
