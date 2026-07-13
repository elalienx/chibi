/** Matches any non-digit character; strips +, -, e and other chars that <input type="number"> allows but should not be stored. */
const nonDigits: RegExp = /\D/g;

export default nonDigits;
