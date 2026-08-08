// Project files
import Button from "components/button/Button";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";

export default function Success() {
  // Global state
  const { application, clearApplication } = useApplication();
  const { resetNavigation } = useFormNavigation();

  // Derived state
  const formattedTurnover = application.turnover.toLocaleString("sv-SE");
  const formattedLoanDebt = application.loan_debt.toLocaleString("sv-SE");

  // Methods
  function startAgain() {
    clearApplication();
    resetNavigation();
  }

  return (
    <div className="default-form">
      <header>
        <h4>Form submitted</h4>
      </header>

      <section>
        <div className="content">
          <p>
            Your turnover is {formattedTurnover} kr and your existing debt is {formattedLoanDebt} kr.
          </p>
          <p>Please share which parts of the previous screen did not behave like the real Lendo site.</p>
          <p>Feel free to criticize everything from missing icons, incorrect spacing, font size, etc.</p>
        </div>
      </section>

      <hr />

      <footer>
        <Button onClick={startAgain}>START AGAIN</Button>
      </footer>
    </div>
  );
}
