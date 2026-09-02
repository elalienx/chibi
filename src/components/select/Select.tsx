// Node modules
import type { MouseEvent } from "react";
import type { FormStore } from "@formisch/react";

// Project files
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import "./select.css";

interface Props {
  /** Unique identifier of the parent selector group to make sure only one selector option is active. */
  id?: string;

  /** The position where the popover will attach to the <Select>. */
  anchorId?: string;

  /** Text to display when no option is selected. */
  children: string;

  /** An instance of a Formisch form. */
  form?: FormStore;

  /** The text inside the user selected option. */
  activeText?: string;
}

export default function Select({ id, anchorId, children, form, activeText }: Props) {
  // Safeguards
  if (!id) return <p>Pass an id to know which field this input belongs</p>;
  if (!form) return <p>This component requires a Formisch form</p>;

  // Derived state
  const listId = `list-${id}`;

  // Methods
  function toggleOptions(event: MouseEvent<HTMLDivElement>): void {
    const target = event.target;

    if (!(target instanceof Element) || target.closest(".input-validation-message")) return;

    document.getElementById(listId)?.togglePopover();
  }

  return (
    <div className="select" onClick={toggleOptions} style={{ anchorName: anchorId }}>
      <Input displayValue={activeText ?? ""} form={form} id={id} placeholder={children} readOnly type="text" />
      <Icon name={"chevron-down"} />
    </div>
  );
}
