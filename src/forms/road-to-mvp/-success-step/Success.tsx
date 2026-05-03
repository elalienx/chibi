// Project files
import Button from "components/button/Button";
import type { Step } from "../types/Step";
import useApplication from "../state/useApplication";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Success({ setStep }: Props) {
  // Global state
  const { application, clearApplication } = useApplication();

  // Properties
  const hasMonthlyFee = application.monthly_fee > 0;
  const feeType = hasMonthlyFee ? "monthly fee" : "operating cost";
  const feePrice = hasMonthlyFee ? application.monthly_fee : application.operating_cost;

  // Methods
  function startAgain() {
    clearApplication();
    setStep("intro-step");
  }

  return (
    <div id="success" className="soft-background">
      <section className="top">
        <header>
          <h4>Form submitted</h4>
        </header>

        <div className="content">
          <p>
            You choose a {application.size}m {application.property_type} with {application.rooms} rooms.
          </p>
          <p>
            Therefore your {feeType} is {feePrice} SEK.
          </p>
          <p>Please share which parts of the previous screen did not behave like the real Lendo site.</p>
          <p>Feel free to critizise everything from missing icons, incorrect spacing, font size, etc.</p>
        </div>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={startAgain}>START AGAIN</Button>
      </section>
    </div>
  );
}
