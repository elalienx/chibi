// Node modules
import type { ReactElement } from "react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./loan-view.css";

interface Props {
  /** The current loan amount in the form. */
  amount: number;

  /** The current loan period in the form. */
  period: number;

  /** The method to call when is time to open the sub-form. */
  onEdit: () => void;
}

export default function LoanView({ amount, period, onEdit }: Props): ReactElement {
  // Properties
  const formatedAmount = amount.toLocaleString("sv-SE");
  const formatedPeriod = period.toLocaleString("sv-SE");

  return (
    <div id="loan-view">
      {/* Loan amount */}
      <div className="item">
        <span className="title">Lånesumma:</span>
        <span className="value">{formatedAmount} kr</span>
      </div>

      {/* Loan period */}
      <div className="item">
        <span className="title">Lånetid:</span>
        <span className="value">{formatedPeriod} år</span>
      </div>

      <div className="vertical-divider">{/* Drawn with CSS */}</div>

      {/* Edit button */}
      <Button onClick={onEdit}>
        Ändra
        <Icon name="pen-to-square" />
      </Button>
    </div>
  );
}
