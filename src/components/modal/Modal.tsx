// Node modules
import { useEffect, useRef } from "react";

// Project files
import useModal from "state/useModal";
import "./modal.css";

export default function Modal() {
  // Global state
  const { modal, closeModal } = useModal();
  const nativeDialogRef = useRef<HTMLDialogElement>(null);

  // Methodds
  useEffect(() => {
    // Safeguard
    if (!nativeDialogRef.current) return;

    if (modal) nativeDialogRef.current.showModal();
    if (!modal) nativeDialogRef.current.close();
  }, [modal]);

  function closeOnBackgroundClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === nativeDialogRef.current) closeModal();
  }

  return (
    <dialog id="modal" ref={nativeDialogRef} onClick={closeOnBackgroundClick}>
      {modal}
    </dialog>
  );
}
