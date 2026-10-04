// Node modules
import { getErrors, type FormStore } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import BusinessFormConfig from "../../data/BusinessFormConfig";
import "./loan-details-edit.css";

const { MIN_AMOUNT, MAX_AMOUNT, MIN_PERIOD, MAX_PERIOD } = BusinessFormConfig;

interface Props {
  /** The form sent by the parent. */
  form: FormStore;

  /** The method to call when is time to close the sub-form. */
  onClose: () => void;
}

export default function LoanDetailsEdit({ form, onClose }: Props) {
  // Methods
  async function validateBeforeClose() {
    // Safeguards
    if (getErrors(form, { path: ["loan_amount"] })) return;
    if (getErrors(form, { path: ["loan_period"] })) return;

    onClose();
  }

  return (
    <div id="loan-details-edit" aria-label="Låneuppgifter">
      <div className="columns">
        <InputField form={form} id="loan_amount">
          <Label>Lånesumma:</Label>
          <Input type="number" suffix="kr" min={MIN_AMOUNT} max={MAX_AMOUNT} />
        </InputField>

        <InputField form={form} id="loan_period">
          <Label>Lånetid:</Label>
          <Input type="number" suffix="år" allowDecimals min={MIN_PERIOD} max={MAX_PERIOD} />
        </InputField>
      </div>

      <footer>
        <Button type="button" onClick={validateBeforeClose}>
          Okej <Icon name="circle-check" />
        </Button>
      </footer>
    </div>
  );
}
