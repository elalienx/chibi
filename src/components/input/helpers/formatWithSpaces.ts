// Project files
import nonDigits from "../regex/nonDigits";
import spaceGroupingPattern from "../regex/spaceGroupingPattern";

/**
 * Large numbers without visual separators are difficult to read (e.g. 1000000 vs 1 000 000).
 *
 * This method formats a numeric value by using the Swedish notation systme of adding a space every three digits.
 */
export default function formatWithSpaces(value: string | number | undefined | null): string {
  // Safeguard
  if (value === undefined || value === null) return "";

  const cleanedValue = String(value).replace(nonDigits, "");
  const formattedValue = cleanedValue.replace(spaceGroupingPattern, " ");

  return formattedValue;
}
