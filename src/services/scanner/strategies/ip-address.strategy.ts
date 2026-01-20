import {
  IssueType,
  type IScannerStrategy,
  type ScanMatch,
} from "../scanner.types";

// IPv4 pattern
const IP_REGEX = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;

export class IPAddressScannerStrategy implements IScannerStrategy {
  readonly type = IssueType.IPAddress;
  readonly placeholder = "[IP_ADDRESS]";

  scan(text: string): ScanMatch[] {
    const matches: ScanMatch[] = [];
    let match: RegExpExecArray | null;

    IP_REGEX.lastIndex = 0;

    while ((match = IP_REGEX.exec(text)) !== null) {
      // Validate each octet is 0-255
      const octets = match[0].split(".").map(Number);
      const isValid = octets.every((o) => o >= 0 && o <= 255);

      if (isValid) {
        matches.push({
          type: this.type,
          value: match[0],
          index: match.index,
          placeholder: this.placeholder,
        });
      }
    }

    return matches;
  }
}

