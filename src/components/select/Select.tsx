// Node modules
import type { ReactNode } from "react";

// Project files
import Icon from "components/icon/Icon";
import "./select.css";

interface Props {
  id?: string;
  anchorId?: string;
  children: ReactNode;
  listId?: string;
  activeOptionText?: ReactNode;
}

export default function Select({ id, anchorId, children, listId, activeOptionText }: Props) {
  // Properties
  const selectId = `trigger-${id}`;
  const textToDisplay = activeOptionText ? activeOptionText : children;

  return (
    <button id={selectId} type="button" className="select" popoverTarget={listId} style={{ anchorName: anchorId }}>
      {textToDisplay}
      <Icon name={"chevron-down"} />
    </button>
  );
}
