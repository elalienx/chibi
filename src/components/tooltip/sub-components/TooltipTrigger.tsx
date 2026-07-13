// Node modules
import type { RefCallback } from "react";

// Project files
import Icon from "components/icon/Icon";
import "./tooltip-trigger.css";

interface Props {
  /** The commands to click, dismiss and assign an Aria role. */
  getReferenceProps: Function;

  /** The reference to know the position of the trigger relatively to the window. */
  setReference: RefCallback<Element>;
}

export default function TooltipTrigger({ getReferenceProps, setReference }: Props) {
  return (
    <button type="button" className="tooltip-trigger" ref={setReference} {...getReferenceProps()}>
      <Icon name="circle-info" />
    </button>
  );
}
