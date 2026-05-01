// Node modules
import type { ReactNode } from "react";

// Project files
import Icon from "components/icon/Icon";
import "./tooltip-trigger.css";

interface Props {
  /**  Text and/or icon to display inside the button. */
  children: ReactNode;
}

export default function TooltipTrigger({ children }: Props) {
  function onClick() {
    alert(`clickend on tooltip to render ${children}`);
  }

  return (
    <button className="tooltip-trigger" onClick={onClick}>
      <Icon name="info" />
    </button>
  );
}
