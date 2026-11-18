// Node modules
import type { MouseEvent } from "react";
import type { FormStore, RequiredPath } from "@formisch/react";

// Project files
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import pathToId from "helpers/pathToId";
import "./select.css";

interface Props {
  /** Formisch path of the form field, like `["employees", 0, "employee_name"]`. Also used to create the DOM id. */
  id?: RequiredPath;

  /** The position where the popover will attach to the <Select>. */
  anchorId?: string;

  /** Text to display when no option is selected. */
  children: string;

  /** An instance of a Formisch form. */
  form?: FormStore;

  /** The text inside the user selected option. */
  activeText?: string;
}

export default function Select({ id: path, anchorId, children, form, activeText }: Props) {
  // Safeguards
  if (!path) return <p>Pass an id to know which field this input belongs</p>;
  if (!form) return <p>This component requires a Formisch form</p>;

  // Derived state
  const id = pathToId(path);
  const listId = `list-${id}`;

  // Methods
  function toggleOptions(event: MouseEvent<HTMLDivElement>): void {
    const target = event.target;
    const validationMessage = ".input-validation-message";

    // Safeguard
    if (!(target instanceof Element) || target.closest(validationMessage)) return; // Avoids closing the list in case you touch the error message by mistake

    document.getElementById(listId)?.togglePopover();
  }

  return (
    <div className="select" onClick={toggleOptions} style={{ anchorName: anchorId }}>
      <Input displayValue={activeText ?? ""} form={form} id={path} placeholder={children} readOnly type="text" />
      <Icon name={"chevron-down"} />
    </div>
  );
}
