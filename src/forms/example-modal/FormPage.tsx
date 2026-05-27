// Project files
import Button from "components/button/Button";
import GuinessModal from "./GuinsessModal";
import useModal from "state/useModal";
import Modal from "components/modal/Modal";
import PCEngineModal from "./PCEngineModal";

export default function FormPage() {
  // Global state
  const { setModal, closeModal } = useModal();

  // Components
  const Modal1 = <GuinessModal />;
  const Modal2 = <PCEngineModal onClose={closeModal} />;

  return (
    <div className="default-form">
      <header>
        <h4>Modal tests</h4>
      </header>

      <section>
        <Button onClick={() => setModal(Modal1)}>Open Guiness modal</Button>
        <Button onClick={() => setModal(Modal2)}>Open PC-Engine modal</Button>
      </section>

      <hr />

      <footer>
        <small>(Text to clean Playwright selector)</small>
      </footer>

      {/* This item should be at the root of each app */}
      <Modal />
    </div>
  );
}
