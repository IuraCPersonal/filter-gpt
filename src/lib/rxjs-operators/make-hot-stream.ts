import { Observable, ReplaySubject, connectable } from "rxjs";

export const makeHotStream = <T>(observable: Observable<T>) => {
  const hot$ = connectable(observable, {
    connector: () => new ReplaySubject(1),
  });
  hot$.connect();
  return hot$;
};
