/**
 * Formisch use strings by default just as native HTML <input>.
 * This creates a conflict because Valibot schemas expect numbers.
 *
 * This method converts initial numeric values to strings to avoid errors.
 * Values are converted back to numbers during form validation.
 */
export default function cleanInitialInput(values: object, treatZeroAsEmpty = false): object {
  const entries = Object.entries(values);
  const cleanedEntries = entries.map(([key, value]) => {
    const isNumber = typeof value === "number";
    const safeValue = isNumber ? String(value) : value;

    // Special case
    if (safeValue === "0" && treatZeroAsEmpty) return [key, ""];

    return [key, safeValue];
  });

  return Object.fromEntries(cleanedEntries);
}
