// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import type { Step } from "../types/Step";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function IntroStep({ setStep }: Props) {
  return (
    <div id="intro-step" className="mortgage-form">
      <header>
        <h4>Road to MPV</h4>
      </header>

      <section>
        <ul>
          <li>Format numbers using spaces.</li>
          <li>Add tracking.</li>
        </ul>
      </section>

      <hr />

      <footer>
        <Button onClick={() => setStep("step-1")}>
          Next <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
