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
  const { application } = useApplication();

  // Properties
  const isApartment = application.property_type == "apartment";
  const isHouse = application.property_type == "house";
  const isHolidayHome = application.property_type == "holiday_home";
  const tenancyType = application.tenancy_agreement;
  const hasMonthlyFee = isApartment || tenancyType == "agreement";
  const hasOperatingCost = isHouse || isHolidayHome || tenancyType == "ownership";

  return (
    <div id="success" className="soft-background">
      <section className="top">
        <header>
          <h3>Form submitted</h3>
        </header>

        <p>
          You choose a {application.size}m {application.property_type} with {application.rooms} rooms.
        </p>
        <p>
          Therefore your {feeType} is {feePrice} SEK.
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
