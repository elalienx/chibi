// Node modules
import { useEffect, useRef, type MouseEvent } from "react";

// Project files
import useModal from "state/useModal";
import "./modal-manager.css";

/**
 * About:
 * This component is not the individual modal content or window,
 * but rather the global manager system. It leverages the native HTML
 * `<dialog>` element to mount and display any given React component as a modal.
 */
export default function ModalManager() {
  // Global state
  const { modal, closeModal } = useModal();

  // Local state
  const nativeDialogRef = useRef<HTMLDialogElement>(null);

  // Methods
  useEffect(
    function syncNativeDialogVisibility() {
      // Safeguards
      if (!nativeDialogRef.current) return;

      if (modal) nativeDialogRef.current.showModal();
      if (!modal) nativeDialogRef.current.close();
    },
    [modal],
  );

  function closeOnBackgroundClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === nativeDialogRef.current) closeModal();
  }

  return (
    <dialog id="modal-manager" ref={nativeDialogRef} onClick={closeOnBackgroundClick} onClose={closeModal}>
      {modal}
    </dialog>
  );
}
