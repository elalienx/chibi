// Project files
import Button from "components/button/Button";
import Tooltip from "components/tooltip/Tooltip";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import "./success.css";

export default function Success() {
  // Global state
  const { clearApplication } = useApplication();
  const { resetNavigation } = useFormNavigation();

  // Methods
  function startAgain() {
    clearApplication();
    resetNavigation();
  }

  return (
    <div className="business-form" id="success-step">
      <section>
        <img alt="" className="success-indicator" height="148" src="/images/success-indicator.svg" width="148" />

        <h3>Tack för din ansökan!</h3>

        <div className="what-happens-now">
          <h4>Vad händer nu?</h4>
          <p>
            Din ansökan har skickats till våra långivare. Du kan se dina personliga erbjudanden genom att trycka på
            knappen nedan. Tänk på att det kan ta upp till 24 timmar att få svar från alla långivare.
          </p>
        </div>

        <Button onClick={startAgain}>Börja om</Button>

        <div className="bank-id-information">
          Varför ber vi om BankID-identifiering?{" "}
          <Tooltip>
            <div className="tooltip-with-title">
              <h5>Identifiering med BankID</h5>
              <p>
                För din och bankens säkerhet ber vi dig att verifiera dig med ditt BankID. Det förhindrar att någon
                obehörig använder sig av dina uppgifter.
              </p>
            </div>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}
