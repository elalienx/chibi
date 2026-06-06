/**
 * Formisch use strings by default just as native HTML `<input>`.
 * This creates a conflict because Valibot schemas expect numbers.
 *
 * This method converts initial numeric values to strings to avoid errors.
 * Values are converted back to numbers during form validation.
 *
 * @param {object} values - The initial form values object to be processed.
 * @param {boolean} [treatZeroAsEmpty=false] - If true, treats the number 0 or string "0" as an empty string.
 * @returns {object} A new object with numeric values converted to strings.
 */
export default function cleanInitialInput(values: object, treatZeroAsEmpty = false): object {
  const entries = Object.entries(values);
  const cleanedEntries = entries.map(([key, value]) => {
    const isNumber = typeof value === "number";
    const isBoolean = typeof value === "boolean";
    let safeValue = value;

    // Conversion
    if (isNumber || isBoolean) safeValue = String(value);

    // Special case
    if (safeValue === "0" && treatZeroAsEmpty) return [key, ""];

    return [key, safeValue];
  });

  return Object.fromEntries(cleanedEntries);
}
