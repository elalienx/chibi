// Node modules
import type { ReactNode } from "react";

// Project files
import Tooltip from "components/tooltip/Tooltip";
import "./label.css";

interface Props {
  /** Unique identifier to connect the label to its corresponding form field. */
  id?: string;

  /** Text to display inside the label. */
  children: ReactNode;

  /** The text or content to display when opening the information tooltip. */
  tooltip?: string | ReactNode;
}

export default function Label({ id, children, tooltip }: Props) {
  // Safeguards
  if (!id) return <p>Please pass an id to connect this label to a form field</p>;

  return (
    <label className="label" htmlFor={id}>
      {children}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </label>
  );
}
