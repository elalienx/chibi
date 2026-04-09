// Project files
import Button from "components/button/Button";
import type { Step } from "../types/Step";
import useLoanApplication from "../helpers/useFormStore";

interface Props {
  setStep: (step: Step) => void;
}

export default function Success({ setStep }: Props) {
  // Global state
  const { loanApplication: formStore } = useLoanApplication();

  // Properties
  const isApartment = formStore.property_type == "apartment";
  const costName = isApartment ? "montly fee" : "operating cost";
  const costPrice = isApartment ? formStore.monthly_fee : formStore.operating_cost;

  return (
    <div id="success" className="soft-background">
      <section className="top">
        <header>
          <h3>Form submitted</h3>
        </header>

        <p>
          You choose a {formStore.size}m {formStore.property_type} with {formStore.rooms} rooms.
        </p>
        <p>
          Therefore your {costName} is {costPrice} SEK.
        </p>
        <p>Please share which parts of the previous screen did not behave like the real Lendo site.</p>
        <p>Feel free to critizise everything from missing icons, incorrect spacing, font size, etc.</p>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={() => setStep("intro-step")}>START AGAIN</Button>
      </section>
    </div>
  );
}
