// Properties
const NON_DIGITS: RegExp = /\D/g;
const WHITE_SPACE: RegExp = /\s/g;

/**
 * HTML `<input type="number"/>` accepts the characters `+`, `-`, and `e` (math exponent).
 *
 * This method cleans the user input to only allow the digits `0` to `9` and, optionally, one decimal separator.
 *
 * `-` and `e` are always stripped. Decimal separators are stripped unless `allowDecimals` is true;
 * accepted commas are normalized to periods for storage.
 */
export default function sanitizeNumber({
  value,
  allowDecimals = false,
}: {
  value: string;
  allowDecimals?: boolean;
}): string {
  const onlyCharacters = value.replace(WHITE_SPACE, "");
  const onlyDigits = onlyCharacters.replace(allowDecimals ? /[^\d.,]/g : NON_DIGITS, "");

  if (!allowDecimals) return onlyDigits;

  const normalizedValue = onlyDigits.replace(/,/g, ".");
  const decimalIndex = normalizedValue.indexOf(".");
  if (decimalIndex === -1) return normalizedValue;

  return `${normalizedValue.slice(0, decimalIndex + 1)}${normalizedValue.slice(decimalIndex + 1).replace(/\./g, "")}`;
}
