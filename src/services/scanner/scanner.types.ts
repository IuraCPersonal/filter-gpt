export const IssueType = {
  Email: "email",
  PhoneNumber: "phone-number",
  IPAddress: "ip-address",
  URL: "url",
} as const;

export type IssueTypes = (typeof IssueType)[keyof typeof IssueType];

export interface ScanMatch {
  type: IssueTypes;
  value: string;
  index: number;
  placeholder: string;
}

export interface ScanResult {
  anonymizedText: string;
  matches: ScanMatch[];
}

export interface IScannerStrategy {
  readonly type: IssueTypes;
  readonly placeholder: string;
  scan(text: string): ScanMatch[];
}
