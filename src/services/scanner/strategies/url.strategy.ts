import {
  IssueType,
  type IScannerStrategy,
  type ScanMatch,
} from "../scanner.types";

// Matches URLs with http/https
const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;

export class URLScannerStrategy implements IScannerStrategy {
  readonly type = IssueType.URL;
  readonly placeholder = "[URL]";

  scan(text: string): ScanMatch[] {
    const matches: ScanMatch[] = [];
    let match: RegExpExecArray | null;

    URL_REGEX.lastIndex = 0;

    while ((match = URL_REGEX.exec(text)) !== null) {
      matches.push({
        type: this.type,
        value: match[0],
        index: match.index,
        placeholder: this.placeholder,
      });
    }

    return matches;
  }
}

