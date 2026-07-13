/**
 * Large numbers without visual separators are difficult to read (e.g. 1000000 vs 1 000 000).
 *
 * This method formats a numeric value by using the Swedish notation systme of adding a space every three digits.
 */
const NON_DIGITS: RegExp = /\D/g;
const SPACE_GROUPING_PATTERN: RegExp = /\B(?=(\d{3})+(?!\d))/g;

export default function formatWithSpaces(value: string | number | undefined | null): string {
  // Safeguard
  if (value === undefined || value === null) return "";

  const cleanedValue = String(value).replace(NON_DIGITS, "");
  const formattedValue = cleanedValue.replace(SPACE_GROUPING_PATTERN, " ");

  return formattedValue;
}
