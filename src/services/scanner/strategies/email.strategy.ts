import {
  IssueType,
  type IScannerStrategy,
  type ScanMatch,
} from "../scanner.types";

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export class EmailScannerStrategy implements IScannerStrategy {
  readonly type = IssueType.Email;
  readonly placeholder = "[EMAIL]";

  scan(text: string): ScanMatch[] {
    const matches: ScanMatch[] = [];
    let match: RegExpExecArray | null;

    // Reset regex state
    EMAIL_REGEX.lastIndex = 0;

    while ((match = EMAIL_REGEX.exec(text)) !== null) {
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
