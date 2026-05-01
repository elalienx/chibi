// Node modules
import { useRef, useState, type ReactNode } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

// Project files
import TooltipTrigger from "./helpers/TooltipTrigger";
import TooltipWindow from "./helpers/TooltipWindow";

interface Props {
  /**  Text or HTML content to display inside the tooltip. */
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
        <TooltipWindow
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
          getFloatingProps={getFloatingProps}
          context={context}
          arrowRef={arrowRef}
        >
          {children}
        </TooltipWindow>
      )}
    </>
  );
}
