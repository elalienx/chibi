// Project files
import Button from "components/button/Button";
import "./pep-warning-modal-co-applicant.css";

interface Props {
  /** A callback to request the modal to be closed. */
  onClose: () => void;

  /** A callback to continue with the application even if the co-applicant is a PEP. */
  onContinue: () => void;
}

/** Warns the user that a co-applicant who is a Politically Exposed Person (PEP) requires a follow-up call. */
export default function PEPWarningModalCoApplicant({ onClose, onContinue }: Props) {
  return (
    <div className="modal" id="pep-warning-modal-co-applicant">
      <section>
        <h5>Är din medsökande PEP?</h5>
        <p>
          Du har angett att din medsökande är en person i politisk utsatt ställning (PEP). Ni kan skicka in er ansökan
          till oss som vanligt men för att vi ska kunna skicka er ansökan vidare till bankerna behöver vi ringa upp din
          medsökande och ställa några kontrollfrågor.
        </p>
        <p>
          Är din medsökande inte en person i politisk utsatt ställning (PEP) och du vill gå vidare med er ansökan
          behöver du bara stänga ner denna ruta och klicka i att din medsökande inte är PEP.
        </p>
      </section>

      <footer>
        <Button variant="secondary" onClick={onClose}>
          Avbryt
        </Button>
        <Button onClick={onContinue}>Gå vidare</Button>
      </footer>
    </div>
  );
}
