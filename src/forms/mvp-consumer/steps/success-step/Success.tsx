// Project files
import Button from "components/button/Button";
import Tooltip from "components/tooltip/Tooltip";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import BankIDTooltip from "./BankIDTooltip";

interface Props {
  /** Shows the co-applicant BankID instructions when the user answered "Ja" in Step 2. */
  hasCoApplicant: boolean;
}

export default function Success({ hasCoApplicant }: Props) {
  // Global state
  const { application, clearApplication } = useApplication();
  const { resetNavigation } = useFormNavigation();

  // Derived state
  const coApplicantPhone = application.co_phone || "(telefonnummer saknas)";

  // Methods
  function startAgain() {
    console.log("Consumer submission", application);
    clearApplication();
    resetNavigation();
  }

  // Components
  const InfoTooltip = <BankIDTooltip />;

  return (
    <div className="consumer-form" id="success-step">
      <img alt="Ansökan skickad" className="success-indicator" src="/images/success-indicator.svg" />

      <h3>Tack för din ansökan!</h3>

      <div className="what-happens-now">
        <h4>Vad händer nu?</h4>

        {!hasCoApplicant && (
          <>
            <p>Vi har nu tagit en kreditupplysning på dig och din ansökan har skickats till våra långivare.</p>
            <p>För att skydda din kreditvärdighet rekommenderar vi att du inte gör fler ansökningar under tiden.</p>
          </>
        )}

        {hasCoApplicant && (
          <>
            <p>
              Din medsökande behöver identifiera sig med BankID innan du kan se dina erbjudanden. Vi har skickat ett sms
              till {coApplicantPhone}.
            </p>
            <p>Observera: Medsökanden kan inte se eller ändra ansökan.</p>
            <p>För att skydda din kreditvärdighet rekommenderar vi att du inte gör fler ansökningar under tiden.</p>
          </>
        )}
      </div>

      <Button onClick={startAgain}>Börja om</Button>

      <div className="bank-id-information">
        Varför ber vi om BankID-identifiering? <Tooltip>{InfoTooltip}</Tooltip>
      </div>
    </div>
  );
}
