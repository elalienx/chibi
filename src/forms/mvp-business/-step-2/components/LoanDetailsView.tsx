// Node modules
import type { ReactElement } from "react";

// Project files
import BusinessFormConfig from "../../data/BusinessFormConfig";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import "./loan-details-view.css";

const { DEFAULT_AMOUNT, DEFAULT_PERIOD } = BusinessFormConfig;

interface Props {
  loanAmount: number;
  loanTerm: number;
}

function LoanDetailView({ loanAmount = DEFAULT_AMOUNT, loanTerm = DEFAULT_PERIOD }: Props): ReactElement {
  return (
    <div id="loan-details-view">
      <p>
        Lånesumma:
        <span>{loanAmount} kr</span>
      </p>
      <p>
        Lånetid:
        <span>{loanTerm} år</span>
      </p>
      <Button>
        <span className="label-tablet">Ändra</span>
        <Icon name="circle-info" />
      </Button>
    </div>
  );
}

export default LoanDetailView;
