// Properties
const NON_NUMBERS: RegExp = /[^\d.,]/g;
const SPACE_GROUPING_PATTERN: RegExp = /\B(?=(\d{3})+(?!\d))/g;

/**
 * Large numbers without visual separators are difficult to read (e.g. 1000000 vs 1 000 000).
 *
 * This method formats a numeric value by using the Swedish system of adding a space every 3 digits.
 *
 * Non-numeric characters are stripped, decimal periods are displayed as commas, and only the
 * integer part is grouped.
 */
export default function formatWithSpaces(value: string | number | undefined | null): string {
  // Safeguard
  if (value === undefined || value === null) return "";

  const normalizedValue = String(value).replace(NON_NUMBERS, "").replace(/,/g, ".");
  const decimalIndex = normalizedValue.indexOf(".");
  const integerPart = decimalIndex === -1 ? normalizedValue : normalizedValue.slice(0, decimalIndex);
  const decimalPart = decimalIndex === -1 ? "" : normalizedValue.slice(decimalIndex + 1).replace(/\./g, "");
  const formattedInteger = integerPart.replace(SPACE_GROUPING_PATTERN, " ");

  return decimalIndex === -1 ? formattedInteger : `${formattedInteger},${decimalPart}`;
}
