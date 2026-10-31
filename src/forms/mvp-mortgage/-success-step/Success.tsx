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
  const { monthly_fee, operating_cost, property_type, rooms, size } = application;
  const hasMonthlyFee = monthly_fee > 0;
  const feeType = hasMonthlyFee ? "monthly fee" : "operating cost";
  const feePrice = hasMonthlyFee ? monthly_fee : operating_cost;
  const formatedFeePrice = feePrice.toLocaleString("sv-SE");
  const result = `You choose a ${size}m ${property_type} with ${rooms} rooms. Therefore your ${feeType} is ${formatedFeePrice} SEK.`;

  // Methods
  function startAgain() {
    console.log("Mortgage submission", result);
    clearApplication();
    resetNavigation();
  }

  // Components
  const InfoTooltip = <BankIDTooltip />;

  return (
    <div className="mortgage-form" id="success-step">
      <img alt="Ansökan skickad" className="success-indicator" src="/images/success-indicator.svg" />

      <h3>Tack för din ansökan!</h3>

      <div className="what-happens-now">
        <h4>Vad händer nu?</h4>
        <div className="body">
          <p>En handläggare från Lendo kommer att ringa upp dig inom kort för att gå igenom din ansökan.</p>
          <p>Se dina erbjudanden genom att logga in med BankID nedan.</p>
        </div>
      </div>

      <Button onClick={startAgain}>Börja om</Button>

      <div className="bank-id-information">
        Varför ber vi om BankID-identifiering? <Tooltip>{InfoTooltip}</Tooltip>
      </div>
    </div>
  );
}
