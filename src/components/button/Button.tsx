// Node modules
import type { ReactNode } from "react";

// Project files
import "./button.css";

interface Props {
  /**  Text and/or icon to display inside the button. */
  children: ReactNode;

  /** The function to execute when clicked. */
  onClick?: () => void;

  /** The behavior of the button when clicked. */
  type?: "button" | "submit" | "reset" | undefined;

  /** The visual style of the button. */
  variant?: "primary" | "secondary" | "tertiary" | "borderless";
}

export default function Button({ children, onClick, type = "button", variant = "primary" }: Props) {
  return (
    <button className={`button ${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
