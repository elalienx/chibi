// Properties
const NON_DIGITS: RegExp = /\D/g;
const WHITE_SPACE: RegExp = /\s/g;

/**
 * HTML `<input type="number"/>` accepts the characters `+`, `-`, and `e` (math exponent).
 *
 * This method cleans the user input to only allow the digits `0` to `9` and, optionally, one decimal comma.
 *
 * `-`, `.`, and `e` are always stripped. Decimal commas are stripped unless `allowDecimals` is true.
 */
export default function sanitizeNumber({
  value,
  allowDecimals = false,
}: {
  value: string;
  allowDecimals?: boolean;
}): string {
  const onlyCharacters = value.replace(WHITE_SPACE, "");
  const onlyDigits = onlyCharacters.replace(allowDecimals ? /[^\d,]/g : NON_DIGITS, "");

  if (!allowDecimals) return onlyDigits;

  const decimalIndex = onlyDigits.indexOf(",");
  if (decimalIndex === -1) return onlyDigits;

  return `${onlyDigits.slice(0, decimalIndex + 1)}${onlyDigits.slice(decimalIndex + 1).replace(/,/g, "")}`;
}
