// Node modules
import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";
import { useField } from "@formisch/react";
import type { FormStore } from "@formisch/react";

// Project files
import calculateInputState from "./helpers/calculateInputState";
import getCorrectMobileKeyboard from "./helpers/getCorrectMobileKeyboard";
import parseDigits from "./helpers/parseDigits";
import type { InputState } from "./helpers/InputState";
import "./input-wrapper-design.css";
import "./input-wrapper-layout.css";
import "./input-wrapper-state.css";

interface Props {
  /** Unique identifier of a form field. */
  id?: string;

  /** An instance of a Formisch form. */
  form?: FormStore;

  /** An example value to show when the field is empty. */
  placeholder?: string;

  /** Decoration text on the right side of the input. Used to indicate a currency or measurment unit. */
  suffix?: string;

  /** Decides what kind of keyboard to show on mobile. This does not affect validation. Handle that separately. */
  type: "email" | "number" | "password" | "tel" | "text";
}

export default function Input({ id, form, placeholder, suffix, type }: Props) {
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
  const cssTypeNumber = type === "number" ? "type-number" : "";
  const curatedType = type === "number" ? "text" : type; // to allow us to control the type number manually as it has too many quirks.
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

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    if (type === "number") {
      event.target.value = parseDigits(event.target.value);
    }

    field.props.onChange(event);
  }

  function onFocus(event: FocusEvent<HTMLInputElement>): void {
    field.props.onFocus(event);
    setFieldIsFocused(true);
  }

  return (
    // We need the wrapper to set the global border and border radious surrounding the input, suffix, and error message
    <div className={`input-wrapper ${inputState} ${cssSuffix}`}>
      <input
        {...field.props}
        id={id}
        aria-errormessage={ariaErrorId}
        aria-invalid={!!field.errors}
        className={`input ${cssTypeNumber}`}
        inputMode={mobileKeyboard}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        type={curatedType}
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
