import type {
  IScannerStrategy,
  IssueTypes,
  ScanMatch,
  ScanResult,
} from "./scanner.types";

export interface ScanOptions {
  ignoredValues?: string[];
}

/**
 * Scanner - Registry pattern for managing multiple scanning strategies
 */
export class Scanner {
  private readonly strategies = new Map<IssueTypes, IScannerStrategy>();

  /** Register a new scanner strategy */
  register(strategy: IScannerStrategy): this {
    this.strategies.set(strategy.type, strategy);
    return this; // Fluent API
  }

  /** Unregister a scanner strategy by type */
  unregister(type: IssueTypes): boolean {
    return this.strategies.delete(type);
  }

  /** Check if a strategy is registered */
  has(type: IssueTypes): boolean {
    return this.strategies.has(type);
  }

  /** Get all registered strategy types */
  getRegisteredTypes(): IssueTypes[] {
    return Array.from(this.strategies.keys());
  }

  /** Scan text using all registered strategies */
  scan(text: string, options: ScanOptions = {}): ScanResult {
    const { ignoredValues = [] } = options;
    const ignoredLower = new Set(ignoredValues.map((v) => v.toLowerCase()));

    const allMatches: ScanMatch[] = [];

    for (const [, strategy] of this.strategies) {
      const matches = strategy
        .scan(text)
        .filter((m) => !ignoredLower.has(m.value.toLowerCase()));

      allMatches.push(...matches);
    }

    // Sort by index descending for safe replacement (right to left)
    allMatches.sort((a, b) => b.index - a.index);

    // Anonymize text
    let anonymizedText = text;
    for (const match of allMatches) {
      anonymizedText =
        anonymizedText.slice(0, match.index) +
        match.placeholder +
        anonymizedText.slice(match.index + match.value.length);
    }

    // Return matches in original order (left to right)
    return {
      anonymizedText,
      matches: allMatches.reverse(),
    };
  }
}
