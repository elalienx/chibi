// Node modules
import { useState, type ChangeEvent } from "react";
import { useField } from "@formisch/react";

// Project files
import flagSweden from "./assets/flag-sweden.svg?url";
import formatTelephone from "./helpers/formatTelephone";
import getInputState from "./helpers/getInputState";
import sanitizeTelephone from "./helpers/sanitizeTelephone";
import type { InputState } from "./types/InputState";
import type InputProps from "./types/InputProps";
import "./styles/input-wrapper-design.css";
import "./styles/input-wrapper-layout.css";
import "./styles/input-wrapper-state.css";

// Properties
const COUNTRY_CODE = "+46";

export default function InputTelephone({ id, path = [], form, placeholder = "+46 XX XXX XX XX" }: InputProps) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // Local state
  const field = useField(form, { path: [...path, id] as [string] });
  const [committedState, setCommittedState] = useState<InputState>("default");
  const [isFocused, setIsFocused] = useState(false);

  // Derived state
  const htmlId = [...path, id].join(".");
  const ariaErrorId = `aria-error-${htmlId}`;
  const displayValue = formatTelephone(String(field.input ?? ""));
  const inputState = getInputState(form, field, committedState, isFocused);
  const hasErrors = inputState === "error" && field.errors;

  // Methods
  function onBlur(): void {
    field.props.onBlur();
    setIsFocused(false);
    setCommittedState(inputState);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    const localDigits = sanitizeTelephone(event.target.value);

    event.target.value = localDigits ? `${COUNTRY_CODE}${localDigits}` : ""; // Stores the full number, example: +46729479111
    field.props.onChange(event);
  }

  function onFocus(): void {
    field.props.onFocus();
    setIsFocused(true);
    setCommittedState(inputState);
  }

  return (
    <div className={`input-wrapper ${inputState} has-prefix`}>
      <span className="prefix">
        <img alt="" className="flag" src={flagSweden} />
        {COUNTRY_CODE}
      </span>
      <input
        {...field.props}
        id={htmlId}
        aria-errormessage={ariaErrorId}
        aria-invalid={!!hasErrors}
        autoComplete="tel"
        className="input type-tel"
        inputMode="tel"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        type="tel"
        value={displayValue}
      />
      {hasErrors && (
        <p id={ariaErrorId} aria-live="polite" className="input-validation-message">
          {field.errors[0]}
        </p>
      )}
    </div>
  );
}
