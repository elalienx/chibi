// Node modules
import { useForm } from "@formisch/react";

// Project files
import cleanInitialInput from "./cleanInitialInput";

interface Props {
  /** The schema of the form. */
  schema: any;

  /** The initial input of the form. */
  initialInput: object;

  /** Convert initial values to string. */
  cleanInput?: boolean;

  /** Treats the number 0 or the string "0" as an empty string. */
  treatZeroAsEmpty?: boolean;
}

/**
 * A thin abstraction layer of Formisch useForm() so we always initialize with the same validation and re-validation rules.
 */
export default function useFormisch({ schema, initialInput, cleanInput = false, treatZeroAsEmpty = false }: Props) {
  // Properties
  const cleanedInput = cleanInitialInput({ input: initialInput, treatZeroAsEmpty: treatZeroAsEmpty });
  const finalInput = cleanInput ? cleanedInput : initialInput;

  return useForm({ schema: schema, validate: "blur", revalidate: "blur", initialInput: finalInput });
}
