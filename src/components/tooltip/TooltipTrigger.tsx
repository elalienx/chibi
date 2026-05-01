// Node modules
import { useState, type ReactNode } from "react";
import {
  autoUpdate,
  flip,
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
import Icon from "components/icon/Icon";
import "./tooltip-trigger.css";

export default function TooltipTrigger() {
  // Local state
  const [isOpen, setIsOpen] = useState(false);

  // Global state
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <>
      {/* Trigger */}
      <button className="tooltip-trigger" ref={refs.setReference} {...getReferenceProps()}>
        <Icon name="info" />
      </button>

      {/* Window */}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="Popover">
            Popover element
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
