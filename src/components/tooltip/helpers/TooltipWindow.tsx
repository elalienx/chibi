// Node modules
import { type CSSProperties, type ReactNode, type RefObject } from "react";
import { FloatingArrow, FloatingFocusManager, type FloatingContext } from "@floating-ui/react";

// Project files
import "./tooltip-window.css";

interface Props {
  /** The reference to position the window relatively to the trigger. */
  setFloating: (node: HTMLElement | null) => void;

  /** The CSS styles to apply for positioning. */
  floatingStyles: CSSProperties;

  /** The commands to handle floating interactions. */
  getFloatingProps: Function;

  /** The floating context for managing the floating element. */
  context: FloatingContext;

  /** The reference to the arrow element. */
  arrowRef: RefObject<SVGSVGElement | null>;

  /** Text and/or elements to display inside the window. */
  children: ReactNode;
}

export default function TooltipWindow({
  setFloating,
  floatingStyles,
  getFloatingProps,
  context,
  arrowRef,
  children,
}: Props) {
  return (
    <FloatingFocusManager context={context} modal={false}>
      <div ref={setFloating} style={floatingStyles} {...getFloatingProps()} className="tooltip-window">
        <FloatingArrow ref={arrowRef} context={context} stroke="rgba(0,0,0,0.08)" strokeWidth={1} />
        <div className="content">{children}</div>
      </div>
    </FloatingFocusManager>
  );
}
