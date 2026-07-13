// Project files
import nonDigits from "../regex/nonDigits";
import whitespace from "../regex/whitespace";

export default function sanitizeNumber(value: string): string {
  const removeSpaces = value.replace(whitespace, "");
  const removeNonDigits = removeSpaces.replace(nonDigits, "");

  return removeNonDigits;
}
