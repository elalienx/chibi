// Node modules
import type { ChangeEvent, ReactNode } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import "./selector-option.css";

interface Props {
  /** Text to display inside the radio option. */
  children: ReactNode;

  /** Unique identifier of the parent radio group to make sure only one radio option is active. */
  id?: string;

  /** An instance of a Formisch form. */
  field?: FieldStore;

  /** The value sent to the database. */
  value: string | number | boolean;
}

export default function SelectorOption({ children, id, field, value }: Props) {
  // Safeguard
  if (!id) return <p>Pass an id to know which field this radio belongs</p>;
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
