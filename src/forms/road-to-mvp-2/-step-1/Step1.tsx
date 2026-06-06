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
    <div id="intro-step" className="business-form">
      <header>
        <h4>Road to MPV 2</h4>
      </header>

      <section>
        <p>
          To see what is pending to reach MVP status, check the first MPV here: <a href="./road-to-mvp">link</a>.
        </p>
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
