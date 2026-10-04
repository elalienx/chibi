// Properties
const DECIMAL_COMMA: RegExp = /,/g;
const EXTRA_DECIMAL_PERIODS: RegExp = /\./g;
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

  // Initial checks
  const normalizedValue = String(value).replace(NON_NUMBERS, "").replace(DECIMAL_COMMA, ".");
  const decimalIndex = normalizedValue.indexOf(".");
  const hasDecimals = decimalIndex !== -1;

  // Integer formatting
  const integerPartWithoutDecimals = normalizedValue;
  const integerPartBeforeDecimal = normalizedValue.slice(0, decimalIndex);
  const integers = hasDecimals ? integerPartBeforeDecimal : integerPartWithoutDecimals;
  const formattedInteger = integers.replace(SPACE_GROUPING_PATTERN, " ");

  // Decimal formatting
  const decimalPartAfterSeparator = normalizedValue.slice(decimalIndex + 1).replace(EXTRA_DECIMAL_PERIODS, "");
  const decimals = hasDecimals ? decimalPartAfterSeparator : "";
  const decimalSuffix = hasDecimals ? `,${decimals}` : "";

  return `${formattedInteger}${decimalSuffix}`;
}
