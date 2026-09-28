// Node modules
import type { ReactElement } from "react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./loan-details-view.css";

interface Props {
  loanAmount: number;
  loanTerm: number;
}

function LoanDetailView({ loanAmount, loanTerm }: Props): ReactElement {
  return (
    <div id="loan-details-view">
      {/* Loan amount */}
      <div className="item">
        <span className="title">Lånesumma:</span>
        <span className="value">{loanAmount} kr</span>
      </div>

      {/* Loan period */}
      <div className="item">
        <span className="title">Lånetid:</span>
        <span className="value">{loanTerm} år</span>
      </div>

      {/* Edit button */}
      <Button>
        Ändra
        <Icon name="circle-info" />
      </Button>
    </div>
  );
}

export default LoanDetailView;
