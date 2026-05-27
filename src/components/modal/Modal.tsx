// Node modules
import { useEffect, useRef } from "react";

// Project files
import useModal from "state/useModal";

export default function Modal() {
  // Global state
  const { modal } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Methodds
  useEffect(() => {
    // Safeguard
    if (!dialogRef.current) return;

    if (modal) dialogRef.current.showModal();
    if (!modal) dialogRef.current.close();
  }, [modal]);

  return (
    <dialog id="modal" ref={dialogRef}>
      {modal}
    </dialog>
  );
}
