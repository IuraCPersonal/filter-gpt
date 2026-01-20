import { Observable, ReplaySubject, connectable } from "rxjs";

/**
 * Converts a cold RxJS observable into a hot observable stream
 * using a ReplaySubject(1) to ensure all subscribers receive the latest value.
 */
export const makeHotStream = <T>(observable: Observable<T>): Observable<T> => {
  const hot$ = connectable(observable, {
    connector: () => new ReplaySubject(1),
  });
  hot$.connect();
  return hot$;
};
