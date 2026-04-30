/**
 * About
 * HTML default <input type="number"/> accepts the characters "+", "-", and "e" (for math exponents)
 * This method cleans the user input to force only the digits 0 to 9.
 */
export default function parseDigits(value: string): string {
  const nonDigits: RegExp = /\D/g;
  const parsedDigits = value.replace(nonDigits, "");

  return parsedDigits;
}
