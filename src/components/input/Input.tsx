// Node modules
import { useEffect, useState, type FocusEvent } from "react";
import { useField } from "@formisch/react";
import type { FormStore } from "@formisch/react";

// Project files
import calculateInputState from "./calculateInputState";
import getCorrectMobileKeyboard from "./getCorrectMobileKeyboard";
import type { InputState } from "./InputState";
import "./input-type-number.css";
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
  const [inputState, setInputstate] = useState<InputState>("default");
  const [fieldIsFocused, setFieldIsFocused] = useState(false);

  // Properties
  const ariaErrorId = `aria-error-${id}`;
  const mobileKeyboard = getCorrectMobileKeyboard(type);
  const cssSuffix = suffix ? "has-suffix" : "";

  // Methods
  useEffect(() => {
    const nextState = calculateInputState(form, field, inputState, fieldIsFocused);

    setInputstate(nextState);
  }, [fieldIsFocused, form.isSubmitted, field.isDirty, field.isValid, inputState]);

  function onFocus(event: FocusEvent<HTMLInputElement>) {
    field.props.onFocus(event);
    setFieldIsFocused(true);
  }

  function onBlur(event: FocusEvent<HTMLInputElement>) {
    field.props.onBlur(event);
    setFieldIsFocused(false);
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
