// Properties
const COUNTRY_CODE: RegExp = /^\+46/;
const NON_DIGITS: RegExp = /\D/g;
const GROUP_SIZES: number[] = [2, 3, 2, 2]; // Swedish mobile format: 72 947 91 11

/**
 * Long phone numbers without visual separators are difficult to read (e.g. 729479111 vs 72 947 91 11).
 *
 * This method removes the +46 country code (shown as a prefix in the input) and groups the local digits using the Swedish mobile format.
 */
export default function formatTelephone(value: string | undefined | null): string {
  // Safeguard
  if (value === undefined || value === null) return "";

  const digits = value.replace(COUNTRY_CODE, "").replace(NON_DIGITS, "");
  const groups: string[] = [];
  let start = 0;

  for (const size of GROUP_SIZES) {
    const group = digits.slice(start, start + size);
    if (group) groups.push(group);
    start += size;
  }

  return groups.join(" ");
}
