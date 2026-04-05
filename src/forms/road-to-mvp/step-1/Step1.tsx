// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import type { Step } from "../helpers/Step";

interface Props {
  setStep: (step: Step) => void;
}

export default function Step1({ setStep }: Props) {
  return (
    <div id="step-1" className="soft-background">
      <section className="top">
        <header>
          <h4>Road to MPV</h4>
        </header>

        <ul>
          <li>Format input currency using spaces.</li>
          <li>Add tooltips.</li>
          <li>Save/load form selection</li>
          <li>Add tracking.</li>
        </ul>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={() => setStep("step2")}>
          Next <Icon name="arrow-right" />
        </Button>
      </section>
    </div>
  );
}
