// Project files
import Icon from "components/icon/Icon";
import "./applicant-header.css";

/** Titles the main applicant fields in Step 3 when there is a co-applicant. */
export default function ApplicantHeader() {
  return (
    <h5 className="applicant-header">
      <Icon name="user" /> Dina uppgifter
    </h5>
  );
}
