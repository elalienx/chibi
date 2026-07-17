// Node modules
import { useState, type FocusEvent } from "react";
import { useField } from "@formisch/react";

// Project files
import getCorrectMobileKeyboard from "./helpers/getCorrectMobileKeyboard";
import getInputState from "./helpers/getInputState";
import type { InputState } from "./types/InputState";
import type InputProps from "./types/InputProps";
import "./styles/input-wrapper-design.css";
import "./styles/input-wrapper-layout.css";
import "./styles/input-wrapper-state.css";

export default function InputText({ id, form, placeholder = "", suffix, type }: InputProps) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // Local state
  const field = useField(form, { path: [id] });
  const [committedState, setCommittedState] = useState<InputState>("default");
  const [isFocused, setIsFocused] = useState(false);

  // Properties
  const ariaErrorId = `aria-error-${id}`;
  const cssSuffix = suffix ? "has-suffix" : "";
  const customValue = field.input as string | number;
  const inputState = getInputState(form, field, committedState, isFocused);
  const mobileKeyboard = getCorrectMobileKeyboard(type);
  const hasErrors = inputState === "error" && field.errors;

  // Methods
  function onBlur(event: FocusEvent<HTMLInputElement>): void {
    field.props.onBlur(event);
    setIsFocused(false);
    setCommittedState(inputState);
  }

  function onFocus(event: FocusEvent<HTMLInputElement>): void {
    field.props.onFocus(event);
    setIsFocused(true);
    setCommittedState(inputState);
  }

  return (
    <div className={`input-wrapper ${inputState} ${cssSuffix}`}>
      <input
        {...field.props}
        id={id}
        aria-errormessage={ariaErrorId}
        aria-invalid={!!field.errors}
        className="input"
        inputMode={mobileKeyboard}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        type={type}
        value={customValue}
      />
      {suffix && <span className="suffix">{suffix}</span>}
      {hasErrors && (
        <p id={ariaErrorId} aria-live="polite" className="input-validation-message">
          {field.errors?.[0]}
        </p>
      )}
    </div>
  );
}
