import {
  IssueType,
  type IScannerStrategy,
  type ScanMatch,
} from "../scanner.types";

// Matches common phone formats: +1234567890, (123) 456-7890, 123-456-7890, etc.
const PHONE_REGEX =
  /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g;

export class PhoneScannerStrategy implements IScannerStrategy {
  readonly type = IssueType.PhoneNumber;
  readonly placeholder = "[PHONE]";

  scan(text: string): ScanMatch[] {
    const matches: ScanMatch[] = [];
    let match: RegExpExecArray | null;

    PHONE_REGEX.lastIndex = 0;

    while ((match = PHONE_REGEX.exec(text)) !== null) {
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

