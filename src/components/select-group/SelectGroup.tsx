// Node modules
import { type ReactNode } from "react";
import { useField, type FormStore } from "@formisch/react";

// Project files
import Label from "components/label/Label";
import Select from "components/select/Select";
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractComponent from "helpers/extractComponent";
import extractSelectOptions from "helpers/extractSelectOptions";
import "./select-group.css";

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

export default function SelectGroup({ id, children, form, hints }: Props) {
  // Safeguard
  if (!children) return <p>Please add a Label and at least two SelectorOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // State
  // @ts-ignore
  const field = useField(form, { path: [id] });

  // Properties
  const anchorId = `--anchor-${id}`; // Requires "--" to work properly.
  const ariaErrorId = `aria-error-${id}`;
  const listId = `list-${id}`;
  const hasErrors = form.isSubmitted && field.errors;

  // Components
  const hint = hints?.[id];
  const label = extractComponent(Label, children, { id, hint });
  const selectOptions = extractSelectOptions(id, children, field);
  const activeOption = selectOptions.find((item) => String(item.props.value) === field.input);
  const activeOptionText = activeOption && activeOption.props.children;
  const select = extractComponent(Select, children, { id, anchorId, activeOptionText });

  return (
    <div className="select-group">
      {label}
      {select}
      {hasErrors && <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors?.[0]}</ValidationMessage>}
      <div id={listId} className="select-list" popover="auto" style={{ positionAnchor: anchorId }}>
        {selectOptions}
      </div>
    </div>
  );
}
