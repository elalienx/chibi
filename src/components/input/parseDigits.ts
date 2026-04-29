export default function parseDigits(value: string): string {
  const nonDigits: RegExp = /\D/g;
  const parsedDigits = value.replace(nonDigits, "");

  return parsedDigits;
}
