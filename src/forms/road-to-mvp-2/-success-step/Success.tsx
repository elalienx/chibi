// Project files
import Button from "components/button/Button";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";

export default function Success() {
  // Global state
  const { application, clearApplication } = useApplication();
  const { setStep } = useFormNavigation();

  // Methods
  function startAgain() {
    clearApplication();
    setStep("step-1");
  }

  return (
    <div className="business-form">
      <header>
        <h4>Form submitted</h4>
      </header>

      <section>
        <div className="content">
          <p>
            You turnover is {application.turnover} and your existing debt is {application.loan_debt}.
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
