// Node modules
import type { ReactNode } from "react";

// Project files
import Tooltip from "components/tooltip/Tooltip";
import "./label.css";

interface Props {
  /** Unique identifier of the parent radio group to make sure only one radio option is active. */
  id?: string;

  /** Text to display inside the label. */
  children: ReactNode;

  /** The text or content to display when opening the information tooltip. */
  tooltip?: ReactNode;
}

export default function Label({ id, children, tooltip }: Props) {
  // Safeguard
  if (!id) return <p>Please pass an id to connect this label to a formulary field</p>;

  return (
    <label className="label" htmlFor={id}>
      {children}
      {tooltip && <Tooltip>{tooltip}</Tooltip>}
    </label>
  );
}
