// Project files
import Button from "components/button/Button";
import GuinessModal from "./GuinsessModal";
import useModal from "state/useModal";
import Modal from "components/modal/Modal";

export default function FormPage() {
  // Global state
  const { setModal } = useModal();

  // Methods
  function onDemoButtonClick() {
    console.log("button click");
    setModal(<GuinessModal />);
  }

  return (
    <div className="default-form">
      <header>
        <h4>Modal tests</h4>
      </header>

      <section>
        <Button onClick={onDemoButtonClick}>Open modal</Button>
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
