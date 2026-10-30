// Project files
import Button from "components/button/Button";
import "./pep-warning-modal.css";

interface Props {
  /** A callback to request the modal to be closed. */
  onClose: () => void;

  /** A callback to continue with the application even if the user is a PEP. */
  onContinue: () => void;
}

/** Warns the user that being a Politically Exposed Person (PEP) requires a follow-up call. */
export default function PEPWarningModal({ onClose, onContinue }: Props) {
  return (
    <div className="modal" id="pep-warning-modal">
      <section>
        <h5>Är du PEP?</h5>
        <p>
          Du har angett att du är en person i politisk utsatt ställning (PEP). Du kan skicka in din ansökan till oss som
          vanligt men för att vi ska kunna skicka din ansökan vidare till bankerna behöver vi ringa upp dig och ställa
          några kontrollfrågor.
        </p>
        <p>
          Är du inte en person i politisk utsatt ställning (PEP) och vill gå vidare med din ansökan behöver du bara
          stänga ner denna ruta och klicka i att du inte är PEP.
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
