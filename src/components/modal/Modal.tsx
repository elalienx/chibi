// Node modules
import { useEffect, useRef } from "react";

// Project files
import useModal from "../../state/useModal";
import "./modal.css";

export default function Modal() {
  const { modal } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (modal) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [modal]);

  return <dialog id="modal" ref={dialogRef}>{modal}</dialog>;
}
