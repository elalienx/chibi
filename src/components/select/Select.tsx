// Node modules
import type { ReactNode } from "react";

// Project files
import Icon from "components/icon/Icon";

interface Props {
  id?: string;
  anchorId?: string;
  children: ReactNode;
  listId?: string;
  activeOptionText?: ReactNode;
}

export default function Select({ id, anchorId, children, listId, activeOptionText }: Props) {
  // Properties
  const triggerId = `trigger-${id}`;
  const textToDisplay = activeOptionText ? activeOptionText : children;

  return (
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
  );
}
