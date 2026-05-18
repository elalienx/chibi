// Node modules
import type { ChangeEvent, ReactNode } from "react";
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

  /** The value sent to the database. */
  value: string | number | boolean;

  /** The name of the <Select> list parent. Used to close the list when an option is selected. */
  selectListId?: string;
}

export default function SelectOption({ id, children, field, value, selectListId = "" }: Props) {
  // Safeguard
  if (!id) return <p>Pass an id to know which field this selector belongs</p>;
  if (!field) return <p>This component requires a Formisch field</p>;

  // Properties
  const stringValue = String(value);

  // Methods
  function onChangeAndForceBlur(event: ChangeEvent<HTMLInputElement>): void {
    const popoverElement = document.getElementById(selectListId);

    if (popoverElement && popoverElement.hidePopover) {
      popoverElement.hidePopover();
    }

    field?.props.onChange?.(event);
    // @ts-ignore
    field?.props.onBlur?.(event);
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
