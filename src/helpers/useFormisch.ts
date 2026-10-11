// Node modules
import { useForm } from "@formisch/react";

// Project files
import cleanInitialInput from "./cleanInitialInput";

interface Props {
  schema: any;
  initialInput: object;
  cleanInput: boolean;
  treatZeroAsEmpty: boolean;
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
