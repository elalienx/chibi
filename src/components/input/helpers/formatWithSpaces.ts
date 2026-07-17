// Properties
const NON_DIGITS: RegExp = /\D/g;
const SPACE_GROUPING_PATTERN: RegExp = /\B(?=(\d{3})+(?!\d))/g;

/**
 * Large numbers without visual separators are difficult to read (e.g. 1000000 vs 1 000 000).
 *
 * This method formats a numeric value by using the Swedish notation systme of adding a space every three digits.
 *
 * Note: integer-only by design; `-` and `.` are stripped. Lendo has no negative numbers, and
 * decimals will be added once a form needs them.
 */
export default function formatWithSpaces(value: string | number | undefined | null): string {
  // Safeguard
  if (value === undefined || value === null) return "";

  const onlyDigits = String(value).replace(NON_DIGITS, "");
  const formattedValue = onlyDigits.replace(SPACE_GROUPING_PATTERN, " ");

  return formattedValue;
}
