// Node modules
import type { ChangeEvent, FocusEvent, ReactNode } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import "./select-option.css";

interface Props {
  /** Unique identifier of the parent selector group to make sure only one selector option is active. */
  id?: string;

  /** Text to display inside the selector option. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  field?: FieldStore;

  /** The name of the <Select> list parent. Used to close the list when an option is selected. */
  listId?: string;

  /** Returns the human-readable option name to the parent as Formisch only tracks the backend value. */
  setSelectedText?: (text: string) => void;

  /** The value sent to the database. */
  value: string | number | boolean;
}

export default function SelectOption({ id, children, field, listId, setSelectedText, value }: Props) {
  // Safeguard
  if (!id) return <p>Pass an id to know which field this selector belongs</p>;
  if (!field) return <p>This component requires a Formisch field</p>;
  if (!listId) return <p>Pass the parent select list id so we can properly close it.</p>;
  if (!setSelectedText) return <p>Pass the setSelectedText method so we can properly update the parent Select.</p>;

  // Properties
  const stringValue = String(value);

  // Methods
  function onChangeAndForceBlur(event: ChangeEvent<HTMLInputElement>): void {
    // Safeguard
    if (!listId) return;
    if (!setSelectedText) return;

    const selectPopover = document.getElementById(listId);
    const childrenAsText = typeof children === "string" ? children : "";

    selectPopover?.hidePopover();
    setSelectedText(childrenAsText);
    field?.props.onChange(event); // First, the default change event.
    field?.props.onBlur(event as FocusEvent<HTMLInputElement>); // Then, blur to trigger Formisch re-validation.
  }

  return (
    <label className="select-option">
      <input
        {...field.props}
        checked={field.input === stringValue}
        name={id}
        onChange={onChangeAndForceBlur}
        type="radio"
        value={stringValue}
      />
      {children}
    </label>
  );
}
