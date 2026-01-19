import { storage } from "@/lib/storage";
import { BehaviorSubject } from "rxjs";

export type Issue = {
  id: string;
  value: string;
  detectedAt: number;
  context?: string;
};

export class Issues {
  private static instance: Issues;

  #activeIssues$ = new BehaviorSubject<Issue[]>([]);
  #historyIssues$ = new BehaviorSubject<Issue[]>([]);

  activeIssues$ = this.#activeIssues$.asObservable();
  historyIssues$ = this.#historyIssues$.asObservable();

  init = () => {
    storage.getIssues().then((issues) => {
      if (issues) {
        this.#activeIssues$.next(issues.activeIssues);
        this.#historyIssues$.next(issues.historyIssues);
      }
    });
  };

  addIssue = (value: string, context?: string) => {
    storage.addIssue(value, context);
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
