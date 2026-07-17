// Properties
const NON_DIGITS: RegExp = /\D/g;
const WHITE_SPACE: RegExp = /\s/g;

/**
 * HTML `<input type="number"/>` accepts the characters `+`, `-`, and `e` (math exponent).
 *
 * This method cleans the user input to only allow the digits `0` to `9`.
 *
 * Note: integer-only by design; `-`, `.`, and `e` are stripped. Lendo has no negative numbers, and
 * decimals will be added once a form needs them.
 */
export default function sanitizeNumber(value: string): string {
  const onlyCharacters = value.replace(WHITE_SPACE, "");
  const onlyDigits = onlyCharacters.replace(NON_DIGITS, "");

  return onlyDigits;
}
