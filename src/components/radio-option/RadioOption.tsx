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
  value: string | number;
}

export default function RadioOption({ children, id, field, value }: Props) {
  // Safeguard
  if (!id) return <p>Pass an id to know which field this radio belongs</p>;
  if (!field) return <p>This component requires a Formisch field</p>;

  // Properties
  const labelId = `${id}_${value}`;

  return (
    <label className="radio-option" id={labelId}>
      <input {...field.props} checked={field.input === value} name={id} type="radio" value={value} />
      {children}
    </label>
  );
}
