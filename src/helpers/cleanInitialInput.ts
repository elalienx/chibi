interface Props {
  /** The initial form values object to be processed from local storage or an API endpoint. */
  input: object;

  /** If true, treats the number 0 or string "0" as an empty string. */
  treatZeroAsEmpty?: boolean;
}

/**
 * Formisch uses strings by default just as native HTML `<input>`.
 * This creates a conflict because Valibot schemas expect numbers.
 *
 * This method converts initial numeric values to strings to avoid errors.
 * Values are converted back to numbers during form validation.
 */
export default function cleanInitialInput({ input, treatZeroAsEmpty = false }: Props): object {
  const entries = Object.entries(input);
  const cleanedEntries = entries.map(([key, value]) => {
    const isNumber = typeof value === "number";
    const isBoolean = typeof value === "boolean";
    let safeValue = value;

    // Conversion
    if (isNumber || isBoolean) safeValue = String(value);

    // Special case
    if (treatZeroAsEmpty && safeValue === "0") return [key, ""];

    return [key, safeValue];
  });

  return Object.fromEntries(cleanedEntries);
}
