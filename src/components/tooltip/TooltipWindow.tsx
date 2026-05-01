// Node modules
import type { ReactNode } from "react";

// Project files
import "./tooltip-window.css";

interface Props {
  /**  Text and/or icon to display inside the button. */
  children: ReactNode;
}

export default function TooltipWindow({ children }: Props) {
  return <div className="tooltip-window">{children}</div>;
}
