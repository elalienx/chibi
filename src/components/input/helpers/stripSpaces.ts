/**
 * `formatWithSpaces` inserts spaces into numbers for display, but those spaces must be removed before validation or storage.
 *
 * This method strips all whitespace from a string so the value can be processed correctly.
 */
export default function stripSpaces(value: string): string {
  return value.replace(/\s/g, "");
}
