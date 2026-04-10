// Node modules
import { useEffect, useState, type ChangeEvent, type FocusEvent } from "react";
import { useField } from "@formisch/react";
import type { FormStore } from "@formisch/react";

// Project files
import calculateInputState from "./calculateInputState";
import getCorrectMobileKeyboard from "./getCorrectMobileKeyboard";
import type { InputState } from "./InputState";
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

  /** Decides what kind of keyboard to show on mobile. This does not affect validation. Handle that separately. */
  type: "text" | "number" | "email" | "tel" | "password";

  /** Decoration text on the right side of the input. Used to indicate a currency or measurment unit. */
  suffix?: string;
}

export default function Input({ id, form, placeholder, type, suffix }: Props) {
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
  const mobileKeyboard = getCorrectMobileKeyboard(type);
  const curatedType = type === "number" ? "text" : type; // to allow us to control the type number manually as it has too many quirks.
  const cssSuffix = suffix ? "has-suffix" : "";
  const cssTypeNumber = type === "number" ? "type-number" : "";

  // Methods
  useEffect(
    function onCalculateInputState() {
      const nextState = calculateInputState(form, field, inputState, fieldIsFocused);

      setInputState(nextState);
    },
    [fieldIsFocused, form.isSubmitted, field.isDirty, field.isValid],
  );

  function onBlur(event: FocusEvent<HTMLInputElement>): void {
    field.props.onBlur(event);
    setFieldIsFocused(false);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>): void {
    // Safeguard
    if (type !== "number") {
      field.props.onChange(event);
      return;
    }

    const nonDigits: RegExp = /\D/g;
    const parsedDigits = event.target.value.replace(nonDigits, "");

    event.target.value = parsedDigits;
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
