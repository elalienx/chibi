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

  // Components
  const hint = hints?.[id];
  const label = extractLabel(id, children, hint);
  const selectOptions = extractSelectOptions(id, children, field);

  return (
    <div className="select">
      {label}

      {/* Select trigger */}
      {/* ⚠️ Check anchor --select-trigger is unique, otherwise, make a property usung id */}
      <button
        type="button"
        className="select-trigger"
        popoverTarget="select-list"
        style={{ anchorName: "--select-trigger" }}
      >
        Please choose an option
      </button>

      <div id="select-list" popover="auto" style={{ positionAnchor: "--select-trigger" }}>
        {selectOptions}
        {/*
        <button className="select-option">House</button>
        <button className="select-option">Apartment</button>
        <button className="select-option">Terraced house</button>
        <button className="select-option">Holiday home</button> 
        */}
      </div>

      {field.errors && form.isSubmitted && (
        <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors?.[0]}</ValidationMessage>
      )}
    </div>
  );
}
