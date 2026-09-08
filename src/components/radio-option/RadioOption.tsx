// Node modules
import type { ChangeEvent, FocusEvent, ReactNode } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import "./radio-option.css";

interface Props {
  /** Unique identifier of the parent radio group to make sure only one radio option is active. */
  id?: string;

  /** Text to display inside the radio option. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  field?: FieldStore;

  /** The value sent to the database. */
  value: string | number | boolean;
}

export default function RadioOption({ id, children, field, value }: Props) {
  // Safeguards
  if (!id) return <p>Pass an id to know which field this radio belongs</p>;
  if (!field) return <p>This component requires a Formisch field</p>;

  // Derived state
  const stringValue = String(value);

  // Methods
  function onChangeAndForceBlur(event: ChangeEvent<HTMLInputElement>): void {
    field?.props.onChange(event); // First, the default change event.
    field?.props.onBlur(event as FocusEvent<HTMLInputElement>); // Then, blur to trigger Formisch re-validation.
  }

  return (
    <label className="radio-option">
      <input
        {...field.props}
        checked={field.input === stringValue}
        name={id}
        onChange={onChangeAndForceBlur}
        type="radio"
        value={stringValue}
      />
      {children}
    </label>
  );
}
