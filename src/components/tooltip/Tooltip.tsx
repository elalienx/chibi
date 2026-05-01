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
import "./helpers/tooltip-trigger.css";
import "./helpers/tooltip-window.css";

interface Props {
  /**  Text and/or icon to display inside the button. */
  children: ReactNode;
}

const SPACE_TINY = 2; // Refactor put all sizes in a const file

export default function Tooltip({ children }: Props) {
  // Local state
  const [isOpen, setIsOpen] = useState(false);

  // Global state
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(SPACE_TINY), flip(), shift()],
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
      <button className="tooltip-trigger" ref={refs.setReference} {...getReferenceProps()}>
        <Icon name="info" />
      </button>

      {/* Window */}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} className="Popover tooltip-window">
            {children}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
