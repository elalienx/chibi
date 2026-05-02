// Node modules
import type { ReactNode } from "react";
import type { FormStore } from "@formisch/react";

// Project files
import extractLabel from "helpers/extractLabel";
import extractInput from "helpers/extractInput";
import "./input-field.css";

interface Props {
  /** Unique identifier of the parent input group to make sure only one radio option is active. */
  id: string;

  /**  Content to display inside the input field. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;
}

export default function InputField({ children, id, form }: Props) {
  // Safeguard
  if (!children) return <p>Please add a Label and a InputField to get started</p>;

  // Components
  const label = extractLabel(id, children);
  const input = extractInput(id, children, form);

  return (
    <div className="input-field">
      {label}
      {input}
    </div>
  );
}
