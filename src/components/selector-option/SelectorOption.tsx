// Node modules
import type { ChangeEvent, ReactNode } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import "./selector-option.css";

interface Props {
  /** Unique identifier of the parent selector group to make sure only one selector option is active. */
  id?: string;

  /** Text to display inside the selector option. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  field?: FieldStore;

  /** The value sent to the database. */
  value: string | number | boolean;
}

export default function SelectorOption({ id, children, field, value }: Props) {
  // Safeguard
  if (!id) return <p>Pass an id to know which field this selector belongs</p>;
  if (!field) return <p>This component requires a Formisch field</p>;

  // Properties
  const stringValue = String(value);

  // Methods
  function onChangeAndForceBlur(event: ChangeEvent<HTMLInputElement>): void {
    field?.props.onChange?.(event); // First, the default change event.
    // @ts-ignore
    field?.props.onBlur?.(event); // Then, the blur event to trigger Formisch re-validate: "blur" rule.
  }

  return (
    <label className="selector-option">
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
