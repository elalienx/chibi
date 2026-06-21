// Node modules
import { useEffect, useState, type FocusEvent } from "react";
import { useField } from "@formisch/react";

// Project files
import calculateInputState from "./helpers/calculateInputState";
import getCorrectMobileKeyboard from "./helpers/getCorrectMobileKeyboard";
import type { InputState } from "./helpers/InputState";
import type InputProps from "./helpers/InputProps";
import "./styles/input-wrapper-design.css";
import "./styles/input-wrapper-layout.css";
import "./styles/input-wrapper-state.css";

export default function InputText({ id, form, placeholder = "", suffix, type }: InputProps) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // State
  // @ts-ignore
  const field = useField(form, { path: [id] });
  const [inputState, setInputState] = useState<InputState>("default");
  const [fieldIsFocused, setFieldIsFocused] = useState(false);

  // Properties
  const ariaErrorId = `aria-error-${id}`;
  const cssSuffix = suffix ? "has-suffix" : "";
  const customValue = String(field.input);
  const mobileKeyboard = getCorrectMobileKeyboard(type);

  // Methods
  useEffect(
    function onFormOrFieldChanged() {
      const nextInputState = calculateInputState(form, field, inputState, fieldIsFocused);

      setInputState(nextInputState);
    },
    [fieldIsFocused, form.isSubmitted, field.isDirty, field.isValid],
  );

  function onBlur(event: FocusEvent<HTMLInputElement>): void {
    field.props.onBlur(event);
    setFieldIsFocused(false);
  }

  function onFocus(event: FocusEvent<HTMLInputElement>): void {
    field.props.onFocus(event);
    setFieldIsFocused(true);
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
      {inputState === "error" && (
        <p id={ariaErrorId} className="input-validation-message">
          {field.errors?.[0]}
        </p>
      )}
    </div>
  );
}
