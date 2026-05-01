// Node modules
import type { RefCallback } from "react";

// Project files
import Icon from "components/icon/Icon";
import "./tooltip-trigger.css";

interface Props {
  /** The reference to know the position of the trigger relatively to the window. */
  setReference: RefCallback<Element>;

  /** The commands to click, dismiss and assign an Aria role. */
  getReferenceProps: Function;
}

export default function TooltipTrigger({ setReference, getReferenceProps }: Props) {
  return (
    <button className="tooltip-trigger" ref={setReference} {...getReferenceProps()}>
      <Icon name="circle-info" />
    </button>
  );
}
