export type Issue = {
  id: string;
  value: string;
  detectedAt: Date;
  context?: string;
};

export class Issues {
  private static instance: Issues;

  // #activeIssues$ = new BehaviorSubject<Issue[]>([]);
  // #history$ = new BehaviorSubject<Issue[]>([]);

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
