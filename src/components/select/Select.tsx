// Node modules
import type { ReactNode } from "react";

// Project files
import Icon from "components/icon/Icon";
import "./select.css";

interface Props {
  /** Unique identifier of the parent selector group to make sure only one selector option is active. */
  id?: string;

  /** The position where the popover will attach to the <Select>. */
  anchorId?: string;

  /** Text to display inside the selector option. */
  children: ReactNode;

  /** The text inside the user selected option. */
  activeText?: ReactNode;
}

export default function Select({ id, anchorId, children, activeText }: Props) {
  // Safeguards
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // Derived state
  const listId = `list-${id}`;
  const textToDisplay = activeText ? activeText : children;

  return (
    <button id={id} className="select" popoverTarget={listId} style={{ anchorName: anchorId }} type="button">
      {textToDisplay}
      <Icon name={"chevron-down"} />
    </button>
  );
}
