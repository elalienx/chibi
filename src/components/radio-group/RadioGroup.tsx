// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore } from "@formisch/react";

// Project files
import Label from "components/label/Label";
import RadioOption from "components/radio-option/RadioOption";
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractComponent from "helpers/extractComponent";
import extractOptions from "helpers/extractOptions";
import "./radio-group.css";

interface Props {
  /** Unique identifier of the parent input group to make sure only one radio option is active. */
  id: string;

  /**  Content to display inside the input field. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;

  /** All the possible tooltips hints available in this form. */
  hints?: Record<string, ReactNode>;
}

export default function RadioGroup({ children, id, form, hints }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and at least two RadioOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Local state
  const field = useField(form, { path: [id] });

  // Properties
  const ariaErrorId = `aria-error-${id}`;
  const hasErrors = form.isSubmitted && field.errors;

  // Components
  const hint = hints?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id, hint } });
  const radioOptions = extractOptions({ component: RadioOption, extractFrom: children, props: { id, field } });

  return (
    <div className="radio-group">
      {label}
      <fieldset id={id} className="options">
        {radioOptions}
      </fieldset>
      {hasErrors && <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors?.[0]}</ValidationMessage>}
    </div>
  );
}
