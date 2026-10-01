// Node modules
import type { ReactElement } from "react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useApplication from "forms/mvp-business/state/useApplication";
import "./loan-details-view.css";

interface Props {
  onEdit: () => void;
}

function LoanDetailView({ onEdit }: Props): ReactElement {
  // Global state
  const { application } = useApplication();

  return (
    <div id="loan-details-view">
      {/* Loan amount */}
      <div className="item">
        <span className="title">Lånesumma:</span>
        <span className="value">{application.loan_amount} kr</span>
      </div>

      {/* Loan period */}
      <div className="item">
        <span className="title">Lånetid:</span>
        <span className="value">{application.loan_period} år</span>
      </div>

      <div className="vertical-divider">{/* The line is drawn with CSS */}</div>

      {/* Edit button */}
      <Button onClick={onEdit}>
        Ändra
        <Icon name="circle-info" />
      </Button>
    </div>
  );
}

export default LoanDetailView;
