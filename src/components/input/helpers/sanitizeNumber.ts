// Properties
const NON_DIGITS: RegExp = /\D/g;
const WHITE_SPACE: RegExp = /\s/g;

export default function sanitizeNumber(value: string): string {
  const onlyCharacters = value.replace(WHITE_SPACE, "");
  const onlyDigits = onlyCharacters.replace(NON_DIGITS, "");

  return onlyDigits;
}
