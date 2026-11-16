// Node modules
import type { ReactNode } from "react";
import type { FormStore, RequiredPath } from "@formisch/react";

// Project files
import Input from "components/input/Input";
import Label from "components/label/Label";
import extractComponent from "helpers/extractComponent";
import pathToId from "helpers/pathToId";
import "./input-field.css";

interface Props {
  /**  Content to display inside the input field. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;

  /** Formisch path of the form field, like `["employees", 0, "employee_name"]`. Also used to create the DOM id. */
  path: RequiredPath;

  /** All the possible tooltips available in this form. */
  tooltips?: Record<string, ReactNode>;
}

export default function InputField({ children, form, path, tooltips }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and a InputField to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Derived state
  const id = pathToId(path);

  // Components
  const tooltip = tooltips?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id, tooltip } });
  const input = extractComponent({ component: Input, extractFrom: children, props: { form, path } });

  return (
    <div className="input-field">
      {label}
      {input}
    </div>
  );
}
