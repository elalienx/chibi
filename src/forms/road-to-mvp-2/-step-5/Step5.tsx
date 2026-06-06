// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import type { Step } from "../types/Step";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Step5({ setStep }: Props) {
  return (
    <div className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={() => setStep("step-4")} />
        <h4>Borgensman</h4>
      </header>

      <section>(pending...)</section>

      <hr />

      <footer>
        <Button type="submit" onClick={() => setStep("success")}>
          Fortsätt <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
