// Node modules
import { type ReactNode } from "react";
import { useField, type FormStore } from "@formisch/react";

// Project files
import Icon from "components/icon/Icon";
import ValidationMessage from "components/validation-message/ValidationMessage";
import extractLabel from "helpers/extractLabel";
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
  const triggerId = `trigger-${id}`;
  const hasErrors = form.isSubmitted && field.errors;

  // Components
  const hint = hints?.[id];
  const label = extractLabel(id, children, hint);
  const selectOptions = extractSelectOptions(id, children, field, listId);

  // Derived state
  const activeOption = selectOptions.find((item) => String(item.props.value) === field.input);
  const textToDisplay = activeOption ? activeOption.props.children : "Please choose an option";

  return (
    <div className="select-group">
      {label}

      <button
        id={triggerId}
        type="button"
        className="select-trigger"
        popoverTarget={listId}
        style={{ anchorName: anchorId }}
      >
        {textToDisplay}
        <Icon name={"chevron-down"} />
      </button>

      <div id={listId} className="select-list" popover="auto" style={{ positionAnchor: anchorId }}>
        {selectOptions}
      </div>

      {hasErrors && <ValidationMessage ariaErrorId={ariaErrorId}>{field.errors?.[0]}</ValidationMessage>}
    </div>
  );
}
