// Project files
import Button from "components/button/Button";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";

export default function Success() {
  // Global state
  const { application, clearApplication } = useApplication();
  const { resetNavigation } = useFormNavigation();

  // Derived state
  const hasMonthlyFee = application.monthly_fee > 0;
  const feeType = hasMonthlyFee ? "monthly fee" : "operating cost";
  const feePrice = hasMonthlyFee ? application.monthly_fee : application.operating_cost;
  const formatedFeePrice = feePrice.toLocaleString("sv-SE");

  // Methods
  function startAgain() {
    clearApplication();
    resetNavigation();
  }

  return (
    <div className="mortgage-form">
      <header>
        <h4>Form submitted</h4>
      </header>

      <section>
        <div className="content">
          <p>
            You choose a {application.size}m {application.property_type} with {application.rooms} rooms.
          </p>
          <p>
            Therefore your {feeType} is {formatedFeePrice} SEK.
          </p>
          <p>Please share which parts of the previous screen did not behave like the real Lendo site.</p>
          <p>Feel free to critizise everything from missing icons, incorrect spacing, font size, etc.</p>
        </div>
      </section>

      <hr />

      <footer>
        <Button onClick={startAgain}>START AGAIN</Button>
      </footer>
    </div>
  );
}
