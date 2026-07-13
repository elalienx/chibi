/** Matches any non-digit character; used to keep only digits 0–9 when cleaning user input or preparing a value for formatting. */
const nonDigits: RegExp = /\D/g;

export default nonDigits;
