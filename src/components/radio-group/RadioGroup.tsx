// Node modules
import type { ReactNode } from "react";
import { useField } from "@formisch/react";
import type { FormStore } from "@formisch/react";

// Project files
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractLabel from "helpers/extractLabel";
import extractRadioOptions from "helpers/extractRadioOptions";
import "./radio-group.css";

interface Props {
  /** Unique identifier of the parent input group to make sure only one radio option is active. */
  id: string;

  /**  Content to display inside the input field. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;
}

export default function RadioGroup({ children, id, form }: Props) {
  // Safeguard
  if (!children) return <p>Please add a Label and at least two RadioOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // State
  // @ts-ignore
  const field = useField(form, { path: [id] });

  // Properties
  const ariaErrorId = `aria-error-${id}`;

  // Components
  const label = extractLabel(id, children);
  const radioOptions = extractRadioOptions(id, children, field);

  return (
    <div className="radio-group">
      {label}
      <div id={id} className="radio-options">
        {radioOptions}
      </div>
      {field.errors && form.isSubmitted && (
        <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors?.[0]}</ValidationMessage>
      )}
    </div>
  );
}
