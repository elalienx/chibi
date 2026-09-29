// Node modules
import type { ReactNode } from "react";

// Project files
import "./button-bordeless.css";
import "./button-primary.css";
import "./button-secondary.css";

interface Props {
  /**  Text and/or icon to display inside the button. */
  children: ReactNode;

  /** The function to execute when clicked. */
  onClick?: () => void;

  /** The behavior of the button when clicked. */
  type?: "button" | "submit" | "reset" | undefined;

  style?: "primary" | "secondary" | "bordeless";
}

export default function Button({ children, onClick, type = "button", style = "primary" }: Props) {
  return (
    <button className={`button ${style}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
