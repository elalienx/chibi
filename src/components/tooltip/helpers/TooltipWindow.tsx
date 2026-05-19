// Node modules
import { type CSSProperties, type ReactNode, type RefObject } from "react";
import { FloatingArrow, FloatingFocusManager, type FloatingContext } from "@floating-ui/react";

// Project files
import Icon from "components/icon/Icon";
import "./tooltip-window.css";

interface Props {
  /** The reference to the arrow element. */
  arrowRef: RefObject<SVGSVGElement | null>;

  /** Text and/or elements to display inside the window. */
  children: ReactNode;

  /** The floating context for managing the floating element. */
  context: FloatingContext;

  /** The CSS styles to apply for positioning. */
  floatingStyles: CSSProperties;

  /** The commands to handle floating interactions. */
  getFloatingProps: Function;

  /** The reference to position the window relatively to the trigger. */
  setFloating: (node: HTMLElement | null) => void;
}

export default function TooltipWindow({
  arrowRef,
  children,
  context,
  floatingStyles,
  getFloatingProps,
  setFloating,
}: Props) {
  return (
    <FloatingFocusManager context={context} modal={false}>
      <div ref={setFloating} style={floatingStyles} {...getFloatingProps()} className="tooltip-window" data-placement={context.placement}>
        {/* Pointy arrow (styled by Floating UI libraty) */}
        <FloatingArrow context={context} ref={arrowRef} stroke="#4C4C4B" strokeWidth={1} />

        {/* Container */}
        <div className="container">
          {/* Content */}
          <div className="content">{children}</div>

          {/* Close button */}
          <button type="button" className="close-button" onClick={() => context.onOpenChange(false)}>
            <Icon name="x-mark" />
          </button>
        </div>
      </div>
    </FloatingFocusManager>
  );
}
