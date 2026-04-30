/**
 * HTML `<input type="number"/>` accepts the characters `+`, `-`, and `e` (math exponent).
 *
 * This method cleans the user input to only allow the digits `0` to `9`.
 */
export default function parseDigits(value: string): string {
  const nonDigits: RegExp = /\D/g;
  const parsedDigits = value.replace(nonDigits, "");

  return parsedDigits;
}
