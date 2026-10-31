// Project files
import Button from "components/button/Button";
import Tooltip from "components/tooltip/Tooltip";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import BankIDTooltip from "./BankIDTooltip";
import "./success.css";

export default function Success() {
  // Global state
  const { application, clearApplication } = useApplication();
  const { resetNavigation } = useFormNavigation();

  // Derived state
  const formattedTurnover = application.turnover.toLocaleString("sv-SE");
  const formattedLoanDebt = application.loan_debt.toLocaleString("sv-SE");
  const result = `Your turnover is ${formattedTurnover} kr and your existing debt is ${formattedLoanDebt} kr.`;

  // Methods
  function startAgain() {
    console.log("Business submission", result);
    clearApplication();
    resetNavigation();
  }

  // Components
  const InfoTooltip = <BankIDTooltip />;

  return (
    <div className="business-form" id="success-step">
      <img alt="Ansökan skickad" className="success-indicator" src="/images/success-indicator.svg" />

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
        Varför ber vi om BankID-identifiering? <Tooltip>{InfoTooltip}</Tooltip>
      </div>
    </div>
  );
}
