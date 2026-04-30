// Node modules
import type { FieldStore, FormStore } from "@formisch/react";

// Project files
import type { InputState } from "./InputState";

/**
 * Lendo input field UX has unique guidelines about when to update the state of the form fields.
 *
 * While UX practices commonly remove errors messages as soon as the user corrects them,
 * Lendo keeps the error message visible until the user both corrects it and decides to exit the input.
 *
 * This method extract's Lendo UX guidelines so the Input.tsx stays clean.
 */
export default function calculateInputState(
  form: FormStore,
  field: FieldStore,
  inputState: InputState,
  fieldIsFocused: boolean,
): InputState {
  // Show error after form submission
  if (form.isSubmitted && !field.isValid) return "error";

  // If the field already had an error, keep it even when focusing again
  if (inputState === "error" && fieldIsFocused) return "error";

  // If the field already had an error, keep it even if user clears the input
  if (inputState === "error" && field.input === "") return "error";

  // If the field already had a success, keep it even when focusing again
  if (inputState === "success" && fieldIsFocused) return "success";

  // While editing a fresh field, stay in focus state
  if (fieldIsFocused) return "focus";

  // Default before interaction
  if (!field.isDirty) return "default";

  // Validate success
  if (field.isValid) return "success";

  // Validate failure
  if (!field.isValid) return "error";

  // Default case
  return "default";
}
