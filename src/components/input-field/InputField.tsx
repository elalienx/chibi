// Node modules
import type { ReactNode } from "react";
import type { FormStore } from "@formisch/react";

// Project files
import Input from "components/input/Input";
import Label from "components/label/Label";
import extractComponent from "helpers/extractComponent";
import "./input-field.css";

interface Props {
  /** Unique identifier of the parent input group to make sure only one radio option is active. */
  id: string;

  /** Parent path of the field, only needed inside nested forms. Example: `["employees", 0]`. */
  path?: readonly (string | number)[];

  /**  Content to display inside the input field. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;

  /** All the possible tooltips available in this form. */
  tooltips?: Record<string, ReactNode>;
}

export default function InputField({ id, path = [], children, form, tooltips }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and a InputField to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Derived state
  const htmlId = [...path, id].join(".");

  // Components
  const tooltip = tooltips?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id: htmlId, tooltip } });
  const input = extractComponent({ component: Input, extractFrom: children, props: { id, path, form } });

  return (
    <div className="input-field">
      {label}
      {input}
    </div>
  );
}
