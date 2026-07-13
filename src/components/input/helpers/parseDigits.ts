// Project files
import nonDigits from "../regex/nonDigits";

/**
 * HTML `<input type="number"/>` accepts the characters `+`, `-`, and `e` (math exponent).
 *
 * This method cleans the user input to only allow the digits `0` to `9`.
 */
export default function parseNumbers(value: string): string {
  return value.replace(nonDigits, "");
}
