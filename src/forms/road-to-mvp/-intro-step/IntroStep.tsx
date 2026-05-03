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
    <div id="intro-step" className="soft-background">
      <section className="top">
        <header>
          <h4>Road to MPV</h4>
        </header>

        <ul>
          <li>Add tracking.</li>
          <li>Save/load form selection</li>
          <li>Format numbers using spaces.</li>
        </ul>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={() => setStep("step-1")}>
          Next <Icon name="arrow-right" />
        </Button>
      </section>
    </div>
  );
}
