// Node modules
import type { ReactNode } from "react";
import { useField } from "@formisch/react";
import type { FormStore } from "@formisch/react";

// Project files
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractLabel from "helpers/extractLabel";
import extractSelectorOptions from "helpers/extractSelectorOptions";
import "./selector-group.css";

interface Props {
  /**  Content to display inside the input field. */
  children?: ReactNode;

  /** Unique identifier of the parent input group to make sure only one selector option is active. */
  id: string;

  /** An instance of a Formisch form. */
  form: FormStore;
}

export default function SelectorGroup({ children, id, form }: Props) {
  // Safeguard
  if (!children) return <p>Please add a Label and at least two SelectorOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // State
  // @ts-ignore
  const field = useField(form, { path: [id] });

  // Properties
  const ariaErrorId = `aria-error-${id}`;

  // Components
  const label = extractLabel(children, id);
  const selectorOptions = extractSelectorOptions(children, id, field);

  return (
    <div className="selector-group">
      {label}
      <div id={id} className="selector-options">
        {selectorOptions}
      </div>
      {field.errors && form.isSubmitted && (
        <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors?.[0]}</ValidationMessage>
      )}
    </div>
  );
}
