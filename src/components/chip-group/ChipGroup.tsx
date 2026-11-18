// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore, type RequiredPath } from "@formisch/react";

// Project files
import Label from "components/label/Label";
import ChipOption from "components/chip-option/ChipOption";
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractComponent from "helpers/extractComponent";
import extractOptions from "helpers/extractOptions";
import getFieldPath from "helpers/getFieldPath";
import "./chip-group.css";

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

export default function ChipGroup({ id, children, form, path, tooltips }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and at least two ChipOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Local state
  const { fieldPath, domId } = getFieldPath(id, path);
  const field = useField(form, { path: fieldPath });

  // Derived state
  const ariaErrorId = `aria-error-${domId}`;
  const hasErrors = form.isSubmitted && field.errors;

  // Components
  const tooltip = tooltips?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id: domId, tooltip } });
  const chipOptions = extractOptions({ component: ChipOption, extractFrom: children, props: { id: domId, field } });

  return (
    <div className="chip-group">
      {label}
      <div id={domId} className="options">
        {chipOptions}
      </div>
      {hasErrors && <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors[0]}</ValidationMessage>}
    </div>
  );
}
