// Node modules
import type { ReactNode } from "react";

// Project files
import "./button-circle.css";

interface Props {
  /** Icon to display inside the button. */
  children: ReactNode;

  /** Accessible name of the button, announced by screen readers. */
  label: string;

  /** The function to execute when clicked. */
  onClick?: () => void;
}

export default function ButtonCircle({ children, label, onClick }: Props) {
  return (
    <button aria-label={label} className="button-circle" onClick={onClick} type="button">
      {children}
    </button>
  );
}
