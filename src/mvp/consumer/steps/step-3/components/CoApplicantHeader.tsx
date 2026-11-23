// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./applicant-header.css";

interface Props {
  /** The function to execute when pressing "Ta bort". */
  onRemove: () => void;
}

/** Titles the co-applicant fields in Step 3 and lets the user remove the co-applicant. */
export default function CoApplicantHeader({ onRemove }: Props) {
  return (
    <div className="co-applicant-header">
      <h5 className="applicant-header">
        <Icon name="user-group-simple" /> Din medsökande
      </h5>
      <Button variant="secondary" onClick={onRemove}>
        Ta bort
      </Button>
    </div>
  );
}
