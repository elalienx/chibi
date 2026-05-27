// Node modules
import { type ReactElement, useState } from "react";

// Project files
import Button from "components/button/Button";
import GuinessModal from "./GuinsessModal";

export default function FormPage() {
  // Local state
  const [modal, setModal] = useState<ReactElement>(<></>);

  // Methods
  function onDemoButtonClick() {
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
    </div>
  );
}
