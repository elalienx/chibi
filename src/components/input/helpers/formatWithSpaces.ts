// Properties
const NON_DIGITS_EXCEPT_COMMA: RegExp = /[^\d,]/g;
const SPACE_GROUPING_PATTERN: RegExp = /\B(?=(\d{3})+(?!\d))/g;

/**
 * Large numbers without visual separators are difficult to read (e.g. 1000000 vs 1 000 000).
 *
 * This method formats a numeric value by using the Swedish system of adding a space every 3 digits.
 *
 * Non-numeric characters are stripped, while decimal commas are preserved.
 */
export default function formatWithSpaces(value: string | number | undefined | null): string {
  // Safeguard
  if (value === undefined || value === null) return "";

  const onlyDigits = String(value).replace(NON_DIGITS_EXCEPT_COMMA, "");
  const formattedValue = onlyDigits.replace(SPACE_GROUPING_PATTERN, " ");

  return formattedValue;
}
