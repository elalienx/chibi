// Node modules
import type { ReactNode } from "react";

// Project files
import "./validation-message.css";

interface Props {
  /**  Content to display inside the input field. */
  children: ReactNode;

  /** A unique identifier for accessibility errors. */
  ariaErrorId: string;
}

export default function ValidationMessage({ children, ariaErrorId }: Props) {
  return (
    <div id={ariaErrorId} className="validation-message">
      <div className="pointy-arrow">{/* Stylized using CSS */}</div>
      <p className="content">{children}</p>
    </div>
  );
}
