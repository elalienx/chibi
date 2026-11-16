// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore, type RequiredPath } from "@formisch/react";

// Project files
import Label from "components/label/Label";
import ChipOption from "components/chip-option/ChipOption";
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractComponent from "helpers/extractComponent";
import extractOptions from "helpers/extractOptions";
import pathToId from "helpers/pathToId";
import "./chip-group.css";

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

export default function ChipGroup({ children, form, path, tooltips }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and at least two ChipOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Local state
  const field = useField(form, { path });

  // Derived state
  const id = pathToId(path);
  const ariaErrorId = `aria-error-${id}`;
  const hasErrors = form.isSubmitted && field.errors;

  // Components
  const tooltip = tooltips?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id, tooltip } });
  const chipOptions = extractOptions({ component: ChipOption, extractFrom: children, props: { id, field } });

  return (
    <div className="chip-group">
      {label}
      <div id={id} className="options">
        {chipOptions}
      </div>
      {hasErrors && <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors[0]}</ValidationMessage>}
    </div>
  );
}
