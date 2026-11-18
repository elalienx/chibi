// Node modules
import type { ReactNode } from "react";
import type { FormStore, RequiredPath } from "@formisch/react";

// Project files
import Input from "components/input/Input";
import Label from "components/label/Label";
import extractComponent from "helpers/extractComponent";
import getFieldPath from "helpers/getFieldPath";
import "./input-field.css";

interface Props {
  /** Unique identifier of the parent input group to make sure only one radio option is active. */
  id: string;

  /**  Content to display inside the input field. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;

  /** Parent segments of the field in nested forms, like `["employees", 0]`. The `id` is added at the end. */
  path?: RequiredPath;

  /** All the possible tooltips available in this form. */
  tooltips?: Record<string, ReactNode>;
}

export default function InputField({ id, children, form, path, tooltips }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and a InputField to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Derived state
  const { domId } = getFieldPath(id, path);

  // Components
  const tooltip = tooltips?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id: domId, tooltip } });
  const input = extractComponent({ component: Input, extractFrom: children, props: { id, form, path } });

  return (
    <div className="input-field">
      {label}
      {input}
    </div>
  );
}
