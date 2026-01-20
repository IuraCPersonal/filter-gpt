import { makeHotStream } from "@/lib/rxjs-operators/make-hot-stream";
import { storage } from "@/lib/storage";
import { BehaviorSubject, filter, map } from "rxjs";

export type Issue = {
  id: string;
  value: string;
  context?: string;
  isActive: boolean;
  detectedAt: number;
  dismissedUntil?: number;
};

export class Issues {
  private static instance: Issues;

  #issues$ = new BehaviorSubject<{
    issues: Issue[];
    syncToStorage?: boolean;
  }>({
    issues: [],
  });

  /**
   * Observable for the active issues.
   */
  activeIssues$ = makeHotStream(
    this.#issues$.pipe(
      map(({ issues }) =>
        issues.filter(
          (i) =>
            (!i.dismissedUntil || i.dismissedUntil < Date.now()) && i.isActive
        )
      )
    )
  );

  /**
   * Observable for the history issues.
   */
  historyIssues$ = makeHotStream(
    this.#issues$.pipe(map(({ issues }) => issues))
  );

  /**
   * Subscribes to the issues observable and syncs the issues to storage.
   */
  sub = this.#issues$
    .pipe(
      filter(({ syncToStorage }) => syncToStorage === true),
      map(({ issues }) => issues)
    )
    .subscribe((issues) => {
      console.log("syncing issues to storage", issues);
      storage.setIssues(issues);
    });

  /**
   * Initializes the issues subject from persisted storage.
   */
  init = () => {
    storage.getIssues().then((issues) => {
      this.#issues$.next({ issues });
    });
  };

  getIssues = () => {
    return this.#issues$.value;
  };

  setIssues = (issues: Issue[]) => {
    this.#issues$.next({ issues });
  };

  dismissIssue = (id: string) => {
    const { issues } = this.#issues$.value;
    const dismissedUntil = Date.now() + 1000 * 60 * 60 * 24;

    const updatedIssues = issues.map((i) =>
      i.id === id ? { ...i, dismissedUntil } : i
    );

    this.#issues$.next({ issues: updatedIssues, syncToStorage: true });
  };

  private constructor() {}

  /** static utilities */
  static getInstance() {
    if (!Issues.instance) {
      Issues.instance = new Issues();
    }
    return Issues.instance;
  }
}

export const issues = Issues.getInstance();
