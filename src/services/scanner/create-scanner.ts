import { Scanner } from "./scanner";
import {
  EmailScannerStrategy,
  IPAddressScannerStrategy,
  PhoneScannerStrategy,
  URLScannerStrategy,
} from "./strategies";

/**
 * Factory function to create a scanner with all default strategies
 */
export const createDefaultScanner = (): Scanner => {
  return new Scanner()
    .register(new EmailScannerStrategy())
    .register(new PhoneScannerStrategy())
    .register(new IPAddressScannerStrategy())
    .register(new URLScannerStrategy());
};

/** Pre-configured singleton scanner instance */
export const scanner = createDefaultScanner();
