// Node modules
import { useRef, useState, type ReactNode } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingFocusManager,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

// Project files
import "./helpers/tooltip-window.css";
import TooltipTrigger from "./helpers/TooltipTrigger";

interface Props {
  /**  Text and/or icon to display inside the button. */
  children: ReactNode;
}

const SPACE_SMALL = 12; // Refactor put all sizes in a const file

export default function Tooltip({ children }: Props) {
  // Local state
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  // Global state
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [offset(SPACE_SMALL), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  // Properties
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <>
      {/* Trigger */}
      <TooltipTrigger setReference={refs.setReference} getReferenceProps={getReferenceProps} />

      {/* Window */}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="tooltip-window">
            <FloatingArrow ref={arrowRef} context={context} stroke="rgba(0,0,0,0.08)" strokeWidth={1} />
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
