// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./remove-co-applicant-modal.css";

interface Props {
  /** A callback to request the modal to be closed. */
  onClose: () => void;

  /** A callback to remove the co-applicant and their data. */
  onRemove: () => void;
}

/** Asks the user to confirm before removing the co-applicant in Step 3. */
export default function RemoveCoApplicantModal({ onClose, onRemove }: Props) {
  return (
    <div className="modal" id="remove-co-applicant-modal">
      <section>
        <Icon name="user-remove" />
        <h5>Ta bort medsökande?</h5>
        <p>Uppgifterna du har fyllt i om din medsökande kommer att raderas.</p>
      </section>

      <footer>
        <Button variant="secondary" onClick={onClose}>
          Avbryt
        </Button>
        <Button onClick={onRemove}>Ta bort</Button>
      </footer>
    </div>
  );
}
