// Node modules
import type { ReactElement } from "react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./loan-details-view.css";

interface Props {
  amount: number;
  period: number;
  onEdit: () => void;
}

export default function LoanDetailView({ amount, period, onEdit }: Props): ReactElement {
  return (
    <div id="loan-details-view">
      {/* Loan amount */}
      <div className="item">
        <span className="title">Lånesumma:</span>
        <span className="value">{amount} kr</span>
      </div>

      {/* Loan period */}
      <div className="item">
        <span className="title">Lånetid:</span>
        <span className="value">{period} år</span>
      </div>

      <div className="vertical-divider">{/* Drawn with CSS */}</div>

      {/* Edit button */}
      <Button onClick={onEdit}>
        Ändra
        <Icon name="circle-info" />
      </Button>
    </div>
  );
}
