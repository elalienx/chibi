// Node modules
import type { ReactNode } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import "./radio-option.css";

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

export default function RadioOption({ children, id, field, value }: Props) {
  // Safeguard
  if (!id) return <p>Pass an id to know which field this radio belongs</p>;
  if (!field) return <p>This component requires a Formisch field</p>;

  // Desctructure
  const { onChange, onBlur, ...restFieldProps } = field.props;

  // Properties
  const stringValue = String(value);

  return (
    <label className="radio-option">
      <input
        {...restFieldProps}
        onChange={(e) => {
          // 2. Let Formisch update the active input state first
          onChange?.(e);

          // 3. Immediately trigger the blur event to force your "blur" validation rule!
          onBlur?.(e);
        }}
        checked={field.input === stringValue}
        name={id}
        type="radio"
        value={stringValue}
      />
      {children}
    </label>
  );
}
