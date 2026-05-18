// Node modules
import { useField, type FormStore } from "@formisch/react";
import type { ReactNode } from "react";

// Project files
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractLabel from "helpers/extractLabel";
import extractSelectOptions from "helpers/extractSelectOptions";
import "./select.css";

interface Props {
  /** Unique identifier of the parent input group to make sure only one select option is active. */
  id: string;

  /**  Content to display inside the select. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;

  /** All the possible tooltips hints available in this form. */
  hints?: Record<string, ReactNode>;
}

export default function Select({ children, id, form, hints }: Props) {
  // Safeguard
  if (!children) return <p>Please add a Label and at least two SelectorOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // State
  // @ts-ignore
  const field = useField(form, { path: [id] });

  // Properties
  const ariaErrorId = `aria-error-${id}`;
  const selectTriggerId = `--select-trigger-${id}`;
  const selectlistId = `select-list-${id}`;
  const defaultQuestion = "Please choose an option";
  const selectedOption = field.input;
  const textToDisplay = selectedOption ? selectedOption : defaultQuestion;

  // Components
  const hint = hints?.[id];
  const label = extractLabel(id, children, hint);
  const selectOptions = extractSelectOptions(id, children, field, selectlistId);

  return (
    <div className="select">
      {label}

      <button
        type="button"
        className="select-trigger"
        popoverTarget={selectlistId}
        style={{ anchorName: selectTriggerId }}
      >
        {/* @ts-ignore */}
        {textToDisplay}
      </button>

      <div id={selectlistId} className="select-list" popover="auto" style={{ positionAnchor: selectTriggerId }}>
        {selectOptions}
      </div>

      {field.errors && form.isSubmitted && (
        <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors?.[0]}</ValidationMessage>
      )}
    </div>
  );
}
