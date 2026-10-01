// Node modules
import { getErrors, type FormStore } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import "./loan-details-edit.css";

interface Props {
  form: FormStore;
  onClose: () => void;
}

export default function LoanDetailsEdit({ form, onClose }: Props) {
  // Methods
  async function onPrepareToClose() {
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
          <Input type="number" suffix="kr" />
        </InputField>

        <InputField form={form} id="loan_period">
          <Label>Lånetid:</Label>
          <Input type="number" suffix="år" />
        </InputField>
      </div>

      <footer>
        <Button type="button" onClick={onPrepareToClose}>
          Okej <Icon name="circle-info" />
        </Button>
      </footer>
    </div>
  );
}
