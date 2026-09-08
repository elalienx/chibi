// Node modules
import type { FieldStore, FormStore } from "@formisch/react";

// Project files
import type { InputState } from "../types/InputState";

/**
 * Lendo input field UX has unique guidelines about when to update the state of the form fields.
 *
 * While UX practices commonly remove error messages as soon as the user corrects them,
 * Lendo keeps the error message visible until the user both corrects it and decides to exit the input.
 *
 * This method extracts Lendo's UX guidelines so Input.tsx stays clean.
 */
function getInputState(form: FormStore, field: FieldStore, inputState: InputState, isFocused: boolean): InputState {
  const hasValue = field.input != null && String(field.input).trim() !== "";

  // Show error after form submission
  if (form.isSubmitted && !field.isValid) return "error";

  // If the field already had an error, keep it when focusing again
  if (inputState === "error" && isFocused) return "error";

  // If the field already had an error, keep it if user clears the input
  if (inputState === "error" && field.input === "") return "error";

  // If the field already had a success, keep it when focusing again
  if (inputState === "success" && isFocused) return "success";

  // While editing a fresh field, stay in focus state
  if (isFocused) return "focus";

  // Show success for valid restored values once validation finishes
  if (!form.isValidating && !field.isDirty && field.isValid && hasValue) return "success";

  // Default before interaction
  if (!field.isDirty) return "default";

  // Validate success
  if (field.isValid) return "success";

  // If nothing else matches...
  return "error";
}

export default getInputState;
