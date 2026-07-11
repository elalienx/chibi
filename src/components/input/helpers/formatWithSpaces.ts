const NON_DIGITS: RegExp = /\D/g;
const SPACE_GROUPING_PATTERN: RegExp = /\B(?=(\d{3})+(?!\d))/g;

export default function formatWithSpaces(value: string | number | undefined | null): string {
  // Safeguard
  if (value === undefined || value === null) return "";

  const cleanedValue = String(value).replace(NON_DIGITS, "");
  const formattedValue = cleanedValue.replace(SPACE_GROUPING_PATTERN, " ");

  return formattedValue;
}
