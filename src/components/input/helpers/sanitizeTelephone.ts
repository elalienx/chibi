// Properties
const NON_DIGITS: RegExp = /\D/g;
const LEADING_ZEROS: RegExp = /^0+/;
const INTERNATIONAL_PREFIX: string = "0046";
const COUNTRY_CODE: string = "46";
const MAX_DIGITS: number = 9; // Swedish mobile numbers without the leading 0, example: 72 947 91 11

/**
 * Swedish users write their mobile number in many ways: "072-947 91 11", "+46 72 947 91 11", or "0046729479111".
 *
 * The country code +46 is already shown as a prefix in the input, so this method keeps only the local digits by removing:
 * 1. Any character that is not a digit.
 * 1. The international prefix "0046" or the country code "46" (when it is followed by a full number, like when pasting or autofilling).
 * 1. The leading 0 that +46 replaces.
 */
export default function sanitizeTelephone(value: string): string {
  const digits = value.replace(NON_DIGITS, "");
  const hasInternationalPrefix = digits.startsWith(INTERNATIONAL_PREFIX);
  const hasCountryCode = digits.startsWith(COUNTRY_CODE) && digits.length > MAX_DIGITS;

  let localDigits = digits;
  if (hasInternationalPrefix) localDigits = digits.slice(INTERNATIONAL_PREFIX.length);
  else if (hasCountryCode) localDigits = digits.slice(COUNTRY_CODE.length);

  return localDigits.replace(LEADING_ZEROS, "").slice(0, MAX_DIGITS);
}
