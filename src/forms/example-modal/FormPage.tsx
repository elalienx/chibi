// Project files
import Button from "components/button/Button";
import GuinessModal from "./GuinessModal";
import useModal from "state/useModal";
import ModalManager from "components/modal-manager/ModalManager";
import PCEngineModal from "./PCEngineModal";

export default function FormPage() {
  // Global state
  const { setModal, closeModal } = useModal.getState(); // Instead of useModal() to reduce re-renders

  // Components
  const Modal1 = <GuinessModal />;
  const Modal2 = <PCEngineModal onClose={closeModal} />;

  return (
    <div className="default-form">
      <header>
        <h4>Modal tests</h4>
      </header>

      <section>
        <p>Each button triggers a different modal but re-using the same architecture!</p>
        <Button onClick={() => setModal(Modal1)}>Open Guiness modal</Button>
        <Button onClick={() => setModal(Modal2)}>Open PC-Engine modal</Button>
      </section>

      <hr />

      <footer>
        <small>(Text to clean Playwright selector)</small>
      </footer>

      {/* This component should be at the root of each app */}
      <ModalManager />
    </div>
  );
}
