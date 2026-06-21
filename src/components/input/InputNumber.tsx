// Node modules
import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";
import { useField } from "@formisch/react";

// Project files
import calculateInputState from "./helpers/calculateInputState";
import formatWithSpaces from "./helpers/formatWithSpaces";
import getCorrectMobileKeyboard from "./helpers/getCorrectMobileKeyboard";
import parseNumbers from "./helpers/parseDigits";
import stripSpaces from "./helpers/stripSpaces";
import type { InputState } from "./helpers/InputState";
import type Input from "./Input";
import "./styles/input-wrapper-design.css";
import "./styles/input-wrapper-layout.css";
import "./styles/input-wrapper-state.css";

export default function Input({ id, form, placeholder, suffix, type }: Input) {
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
  const customPlaceholder = placeholder ?? "0";
  const customType = "text"; // To manually control the type as it has too many quirks.
  const customValue = String(field.input);
  const mobileKeyboard = getCorrectMobileKeyboard(type);
  const displayValue = formatWithSpaces(customValue);

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

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    const rawString = stripSpaces(event.target.value);

    event.target.value = parseNumbers(rawString);
    field.props.onChange(event);
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
        className="input type-number"
        inputMode={mobileKeyboard}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={customPlaceholder}
        type={customType}
        value={displayValue}
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
